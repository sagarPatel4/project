const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role:{
        type:String,
        required:true,
        default:"NORMAL"
    }
}, {
    timestamps: true
})

const User = mongoose.model('user', userSchema)
module.exports = User