require('dotenv').config();
const express=require('express');
const app=express();
const cors=require('cors');
const path = require('path');
const connectDB=require('./config/db');
const foodRouter = require('./routes/foodRoute');
const PORT=process.env.PORT || 4000;


// middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
connectDB();

// api endpoint
app.use("/api/food",foodRouter);
app.use("/images",express.static("uploads"));


app.get("/",(req,res)=>{
  res.send("Hii");
})


app.listen(PORT,()=>{
  console.log(`Server is running on PORT http://localhost:${PORT}`);
})



