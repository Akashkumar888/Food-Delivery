const foodModel = require('../models/foodModel');
const imagekit = require('../utils/imagekit');

const addFood = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Image file is missing." });
  }

  try {
    const uploadedImage = await imagekit.upload({
      file: req.file.buffer,
      fileName: `${Date.now()}_${req.file.originalname}`,
    });

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: uploadedImage.url,
    });
    


    await food.save();
    // console.log("✅ Food saved:", food);

    res.json({
      success: true,
      message: "Food Added",
      data: food,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const removeFood = async (req, res) => {
  try {
    await foodModel.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, message: "Food removed" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { addFood, listFood, removeFood };
