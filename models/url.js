const { default: mongoose } = require("mongoose")
const mongoos = require("mongoose")

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        require: true,
    },
    visitHistory: [{
        timestamp: { type: Number }
    }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
}, { timestamps: true })

const URL =mongoos.model('url',urlSchema)

module.exports=URL