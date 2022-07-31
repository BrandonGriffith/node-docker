const express = require("express");
const app = express();
app.use(express.json());
app.enable("trust proxy");
app.get("/", (_req,res) => res.send("<h1>BMG, Hello My Friend!</h1>"));


const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");


const cors = require("cors");
const corsOptions = {
    origin: 'http://localhost:3333',
    credentials: true,
};
app.use(cors(corsOptions));


const session = require("express-session")
let RedisStore = require("connect-redis")(session)
const { createClient } = require("redis")
let redisClient = createClient({ legacyMode: true, url: 'redis://redis:6379', })
redisClient.connect().catch(console.error);
redisClient.on('connect', (_err) => console.log('Connected to redis successfully'));
const mySession = session({
    key: "sessionCookie",
    store: new RedisStore({ client: redisClient }),
    secret: 'secret$%^134',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60000,
        secure: false,
        httpOnly: false,
        maxAge: 30000,
    },
    },
);
app.use(mySession);


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


app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);
module.exports = app;
