const jwt = require('jsonwebtoken')   //bcoz we have used jwt here so we have to require it

async function identifyUser(req, res, next){

    const token = req.cookies.token      // phle dekhenge ki kis user ki trf se request ara hain using cookies
    
        if(!token){
            return res.status(401).json({
                message: "UnAuthorized Access"
            })
        }
    
        let decoded;
    
        try{
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } catch (err) {
            return res.status(401).json({
                message: "Invalid Token"
            })
        }

        req.user = decoded
        
        next()  //reques ko aage forward krdere hain 
}
 
module.exports = identifyUser