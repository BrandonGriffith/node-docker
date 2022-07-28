const express = require("express");
const app = express();


const port = process.env.EXPRESSPORT;
app.listen(port, ()=>console.log(`express is listening on port ${port}`));


app.get('/', (_req,res) => {
    res.send("<h1>BMG, Hello My Friend.</h1>")
});


const mongoose = require("mongoose");
const mongoUser = process.env.MONGO_INITDB_ROOT_USERNAME;
const mongoPass = process.env.MONGO_INITDB_ROOT_PASSWORD;
mongoose.connect(`mongodb://${mongoUser}:${mongoPass}@mongo:27017/?authSource=admin`)
.then(()=>console.log("mongoDB connected"))
.catch((e)=>console.log("mongoDB error " + e));