const express = require('express');
const foodRouter = express.Router();
const { addFood, listFood, removeFood } = require('../controllers/foodController');
const multer = require('multer');

// Use memoryStorage for buffer-based upload to ImageKit
const upload = multer({ storage: multer.memoryStorage() });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

module.exports = foodRouter;

