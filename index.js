const express = require('express')
const { connectionToMongoDb } = require("./connnection")
const urlRout = require("./routes/url")
const URL = require('./models/url')
const app = express()
const port = 8001

connectionToMongoDb('mongodb://localhost:27017/short_url')
    .then(() => console.log("MongoDB Connected"))

app.use(express.json())
app.use("/url", urlRout)
app.use("/", urlRout)



app.listen(port, () => console.log(`Example app listening on port ${port}!`))