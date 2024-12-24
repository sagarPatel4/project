const sessionIdToUseraMap=new Map()

function setUser(id,user){
    sessionIdToUseraMap.set(id,user);
}
function getUser(id){
    return sessionIdToUseraMap.get(id);
}

module.exports={
    setUser,
    getUser
}