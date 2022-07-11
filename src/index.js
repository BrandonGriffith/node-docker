const express = require("express");
const app = express();
const port = process.env.PORT;

app.get('/', (_req,res) => {
    res.send("<h1>BMG, Hello My Friend.</h1>")
});

app.listen(port, ()=>console.log(`running on port ${port}`));