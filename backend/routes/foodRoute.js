
const express=require('express');
const foodRouter=express.Router();
const {addFood, listFood, removeFood}=require('../controllers/foodController');

// image storage engine 

const multer = require('multer');
const path = require('path');

// Storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');// ensure 'uploads' folder exists or handle it
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload=multer({storage:storage});


foodRouter.post("/add",upload.single("image"), addFood);
foodRouter.get("/list",listFood);
foodRouter.post('/remove',removeFood);




module.exports=foodRouter;