const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    let token = req.headers.authorization;
    console.log(token);
    if (!token) {
        return res.status(401).send({
            auth: false,
            token: null,
            message:"missing token, please login"
        })
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                auth: false,
                token: null,
                message:"no authorized"
            })
        }
        console.log(decoded);
        // Verify admin role
        if (decoded.isAdmin == false) {
            return res.status(401).send({
                auth: false,
                adminToken: null,
                message:"permission denied"
            })
        }
        next();
    })
}

module.exports = verifyToken;