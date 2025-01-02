const { getUser } = require("../service/authjwt")

// function checkForAuthentication(req,res,next) {
//     const authorizationHeaderValue = req.headers["authorization"]
//     if(!authorizationHeaderValue || !authorizationHeaderValue)
// }

async function restrictToLoggedInUserOnly(req, res, next) {
    const userUid = req.headers["authorization"]
    if (!userUid) return res.redirect("/signin")
    const token=userUid.split("Bearer ")[1];
    const user =  getUser(token)  
    if (!user) return res.redirect("/signin")

    req.user = user
    next()
}
 async function checkAuth(req, res, next) {
    const userUid = req.headers["authorization"]

    console.log(userUid);
    
    const token=userUid.split("Bearer ")[1]
    const user =  getUser(token)  
    req.user = user

    next()
 }

module.exports={
    restrictToLoggedInUserOnly,
    checkAuth
}