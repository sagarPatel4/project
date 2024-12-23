const path = require("path")
const express = require('express')
const { connectionToMongoDb } = require("./connnection")

const urlRout = require("./routes/url")
const userRoute=require("./routes/user")

const URL = require('./models/url')

const app = express()
const port = 8001

connectionToMongoDb('mongodb://localhost:27017/short_url')
    .then(() => console.log("MongoDB Connected"))

    app.set("view engine","ejs")
    app.set("view",path.resolve*"./views")
     
app.use(express.json())
app.use("/url", urlRout)
app.use("/user", userRoute)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))