const User =require('../models/user')

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password
    })
    return res.json({success:"SignUp Success"})
}
module.exports={
    handleUserSignup
}
async function handleUserSignin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({
        email,
        password
    })
    if(!user)return res.json({error:"Invalid UserName And Password"})

    return res.json({success:"Login Success"})
}


module.exports={
    handleUserSignup,
    handleUserSignin
}