const { getUser } = require("../service/auth")

async function restrictToLoggedInUserOnly(req, res, next) {
    const userUid = req.cookies.uid

    if (!userUid) return res.redirect("/signin")
    const user = await getUser(userUid)

    if (!user) return res.redirect("/signin")

    req.user = user

    console.log("user "+user);
    
    next()
}
 async function checkAuth(req, res, next) {
    const userUid = req.cookies.uid

  
    const user = await getUser(userUid)

    req.user = user

    next()
 }

module.exports={
    restrictToLoggedInUserOnly,
    checkAuth
}