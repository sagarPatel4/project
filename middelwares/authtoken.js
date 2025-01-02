const { getUser } = require("../service/authjwt")

function checkForAuthentication(req, res, next) {

    
    // const authorizationHeaderValue = req.headers["authorization"]
    // req.user = null;
    
    req.user = null;
    const tokenCookie = req.cookies.token
    
    // if (!authorizationHeaderValue || !authorizationHeaderValue.startsWith('Bearer'))
    if (!tokenCookie)
        return next();


    // const token = authorizationHeaderValue.split("Bearer ")[1];
    // const user = getUser(token)

    const token = tokenCookie;
    const user = getUser(token)

    req.user = user
    return next();
}

function restrictTo(roles = []) {
    return function (req, res, next) {
        
        if (!req.user) return res.redirect("/signin")

        if (!roles.includes(req.user.role)) return res.end("UnAuthorized")

        return next()
    }
}

module.exports = {
    checkForAuthentication,
    restrictTo
}