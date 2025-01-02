const jwt=require("jsonwebtoken")
const secret="Sagar@123"

function setUser(user){

    const tokenPayload = {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
    };

console.log(jwt.sign(tokenPayload,secret)+ " user");

    return jwt.sign(tokenPayload,secret)
}
function getUser(token) {
    console.log(token +" token");
    
    if (!token) return null;
    try {
        return jwt.verify(token, secret); // Decodes the token if valid
    } catch (err) {
        console.error("Invalid or expired token:", err.message);
        return null; // Return null for invalid or expired tokens
    }
}

module.exports={setUser,getUser}