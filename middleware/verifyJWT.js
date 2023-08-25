const jwt = require('jsonwebtoken')

const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if(!authHeader?.startsWith("Bearer ")) return res.sendStatus(401)
    const token = authHeader.split(" ")[1]
    console.log(token)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.sendStatus(403);
        req.userInfo= decoded.userInfo
        console.log(req.userInfo)
        next();
    })
}

module.exports = { verifyJWT }