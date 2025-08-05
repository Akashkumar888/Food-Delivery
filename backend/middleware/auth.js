require('dotenv').config();

const jwt=require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not Authorized Login again"});
    }
    
    const token = authHeader.split(" ")[1];
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id; // important line hai ye 
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: "Invalid Token" });
    }
  };
  
  module.exports=authMiddleware;

  

  // const authMiddleware=async(req,res,next)=>{
  //   const {token}=req.body;
  //   if(!token)return res.json({success:false,message:"Not Authorized Login again"});
  //   try{
  //     const token_decoded=jwt.verify(token,process.env.JWT_SECRET);
  //     req.body.userId=token_decoded.id;
  //     next();
  //   }
  //   catch(error){
  //   res.json({success:false,message:"Error"});
  //   }
  // }


