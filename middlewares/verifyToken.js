const { verify } = require("jsonwebtoken");

const verifyToken = (req, res, next)=>{
    const token = req.cookies?.token;
    // console.log('verify token', token);
    if(!token){
        return res.status(401).send({message: 'unauthorized access'})
    }

    verify(token, process.env.JWT_SECRET, (err, decoded)=>{

        if(err){
            return res.status(401).send({message: 'unauthorized access'})
        }

        req.decoded = decoded

        next()
    })
}

module.exports = verifyToken;