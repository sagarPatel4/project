const path = require("path")
const cookieParser = require('cookie-parser');
const express = require('express')
const { connectionToMongoDb } = require("./connnection")
const {checkForAuthentication,restrictTo}=require("./middelwares/authtoken")
const urlRout = require("./routes/url")
const userRoute=require("./routes/user")
const staticRoute=require("./routes/staticRouter")

const URL = require('./models/url')

const app = express()
const port = 8001

connectionToMongoDb('mongodb://localhost:27017/short_url')
    .then(() => console.log("MongoDB Connected"))

    app.set("view engine","ejs")
    app.set("views",path.resolve("./views"))
     
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthentication)



app.use("/url", restrictTo(["NORMAL"]),urlRout)
app.use("/user", userRoute)
app.use("/", staticRoute)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))