const express = require("express");
const app = express();
app.use(express.json());
app.get("/", (_req,res) => res.send("<h1>BMG, Hello My Friend!</h1>"));


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


const postRouter = require("./routes/postRoutes");
app.use("/api/v1/posts", postRouter);


const userRouter = require("./routes/userRoutes");
app.use("/api/v1/users", userRouter);