const { v4: uuidv4 } = require('uuid')
const User = require('../models/user')


// const { setUser } = require("../service/auth")  //use statfull authentication
const { setUser } = require("../service/authjwt")  // stateless authentication

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    try {
        // Assuming you are trying to create a user
        await User.create({
            name,
            email,
            password
        })
        console.log(res);

        return res.redirect("/")
    } catch (error) {
        if (error.code === 11000) {
            // Extract duplicate key error details
            const field = Object.keys(error.keyValue)[0]; // Get the field causing the error
            const value = error.keyValue[field]; // Get the duplicate value

            // Send a user-friendly error response
            return res.status(400).json({
                error: "email is already used"
            });
        }
    }


}

async function handleUserSignin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({
        email,
        password
    })

    if (!user) return res.render("login", { error: "Invalid UserName And Password" })


    // const sessionId = uuidv4();
    // setUser(sessionId,user)
    // res.cookie("uid",sessionId)

    const token = setUser(user)
    res.cookie("uid",token)
    return res.redirect("/")
}


module.exports = {
    handleUserSignup,
    handleUserSignin
}