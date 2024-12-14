const ensureisAuthenticated = (req,res,next)=>{
    if( req.isAuthenticated()){
        return next();
    }
    res.status(401).json({message:"Unauthorized,please log in"})
};

module.exports = ensureisAuthenticated;