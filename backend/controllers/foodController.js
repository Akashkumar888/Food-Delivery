
const foodModel=require('../models/foodModel');
const fs=require('fs');

const addFood=async(req,res)=>{
  
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Image file is missing." });
  }
  let image_filename=req.file?.filename;

  const food=new foodModel({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category,
    image:image_filename,
  }) 
  try{
    await food.save();
    res.json({
      success:true,
      message:"Food Added"
    })
  }
  catch(error){
  console.log(error);
  res.json({success:false,message:error.message});
  }
}

const listFood=async(req,res)=>{
  try{
  const foods=await foodModel.find({});
  res.status(200).json({
    success:true,
    data:foods,
  })
  }
  catch(error){
  console.log(error);
  res.status(400).json({
    success:false,
    message:error.message,
  })
  }
}

const removeFood=async(req,res)=>{
  try{
    const food=await foodModel.findById(req.body.id);

    // Safe to access food.image now
    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) console.error("File delete error:", err);
    });
    
    await foodModel.findByIdAndDelete(req.body.id);
    res.status(200).json({
      success:true,
      message:"Food removed",
    })
  }
  catch(error){
    console.log(error);
    res.status(400).json({
      success:false,
      message:error.message,
    })
  }
}




module.exports={addFood,listFood,removeFood};