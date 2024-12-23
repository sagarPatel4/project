const mongoose=require("mongoose")

    async function connectionToMongoDb(url) {
        return mongoose.connect(url)
    }

    module.exports={connectionToMongoDb}