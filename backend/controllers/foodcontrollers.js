 import foodModel from "../models/foodmodels.js";
import fs from 'fs'

// add food item
const addFood=async (req,res)=>{
  let image_filename=`${req.file.filename}`;
  const food=new foodModel({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category,
    image:image_filename
  })
  try{
    await food.save();
    res.json({success:true,message:"food added"})
  }catch(error){
   console.log(error)
   res.json({success:false,message:"error"})
  }
}
// all food list
const listfood=async (req,res)=>{
try{
    // fetch all food items ko 
    const foods=await foodModel.find({})
    res.json({success:true,data:foods})
}catch(error)
{
    console.log(error);
    res.json({success:false,message:"error"})
}
}
// remove food item 

const removefood = async (req, res) => {
  try {
    const { _id } = req.body   // ✅ CORRECT

    if (!_id) {
      return res.json({ success: false, message: "Food ID required" })
    }

    const food = await foodModel.findById(_id)

    if (!food) {
      return res.json({ success: false, message: "Food not found" })
    }

    // ✅ unlink typo FIXED
    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) console.log("Image delete error:", err)
    })

    await foodModel.findByIdAndDelete(_id)

    res.json({ success: true, message: "Food removed" })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error removing food" })
  }
}


export {addFood,listfood,removefood}


