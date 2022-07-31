const express = require("express");
const app = express();
app.use(express.json());
app.get("/", (_req,res) => res.send("<h1>BMG, Hello My Friend!</h1>"));


const session = require('express-session');
const connectRedis = require('connect-redis');
var RedisStore = connectRedis(session);
const { createClient } = require("redis");
const pubClient = createClient({ url: 'redis://redis:6379' });
pubClient.connect();
pubClient.on('connect', (_err) => console.log('Connected to redis successfully'));
app.use(session({
    name: "bmg",
    store: new RedisStore({ client: pubClient }),
    secret: 'secret$%^134',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 1000 * 60 * 10
    },
    },
));


const port = process.env.EXPRESSPORT;
app.listen(port, ()=>console.log(`express is listening on port ${port}`));


const mongoose = require("mongoose");
const mongoUser = process.env.MONGO_INITDB_ROOT_USERNAME;
const mongoPass = process.env.MONGO_INITDB_ROOT_PASSWORD;
const connectToMongooseDB = () => {
    mongoose.connect(`mongodb://${mongoUser}:${mongoPass}@mongo:27017/?authSource=admin`)
    .then(()=>console.log("mongoDB connected"))
    .catch((e)=>{console.log(e); setTimeout(connectToMongooseDB, 3000)});
};
connectToMongooseDB();


app.enable("trust proxy");
const postRouter = require("./routes/postRoutes");
app.use("/api/v1/posts", postRouter);
const userRouter = require("./routes/userRoutes");
app.use("/api/v1/users", userRouter);
module.exports = app;
