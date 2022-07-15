const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.EXPRESSPORT;


const mongoUser = process.env.MONGO_INITDB_ROOT_USERNAME;
const mongoPass = process.env.MONGO_INITDB_ROOT_PASSWORD;
mongoose.connect(`mongodb://${mongoUser}:${mongoPass}@172.22.0.2:27017/?authSource=admin`)
.then(()=>console.log("mongoDB connected"))
.catch((e)=>console.log("mongoDB error " + e));


app.get('/', (_req,res) => {
    res.send("<h1>BMG, Hello My Friend!</h1>")
});


app.listen(port, ()=>console.log(`running on port ${port}`));
