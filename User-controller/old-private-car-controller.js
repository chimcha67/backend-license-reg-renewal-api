const oldPrivateCar= require('../models/old-private-car-schema')
const express = require('express')
 require("dotenv").config()
 const cloudinary = require('../controllers/cloudinary')
 //const emailValidator = require('deep-email-validator')

const controller = express()

const renewPrivateCarReg = async(req, res, file)=>{
  try {
    const { licence_id, roadworthiness_id, vin}= req.body
 console.log(req.files);

 const checkCarByVin = await oldPrivateCar.findOne({vin})
 const checkCarByLicenceId = await oldPrivateCar.findOne({licence_id})

  if(checkCarByLicenceId || checkCarByVin){
      return res.status(400).json({
          status: false,
          message: 'vin or licence id already exist pls verify and try again'
  })
  }

   // submitting credentials
   let {payload} = req.body
   var imgUrl =''
   //if(req.file) var imgUrl= `files/img/${req.file.originalname}`
   //const result = await cloudinary.uploader.upload(req.file.path);
   //console.log(result)
   const uploader = async(path)=>await cloudinary.uploads(path)
 
   
   const credentials = await oldPrivateCar.create({
       user_id:req.user.id,
       //cloudinary_id: result.public_id,
       vin:vin,
       car_license_image:req.files.image[0].path,
       licence_id: licence_id,
       roadworthiness_image:req.files.image[1].path,
       roadworthiness_id: roadworthiness_id,
       
        insurance_image:req.files.image[2].path
       
       })

  
   res.status(201).json({
       success: true,
       message: 'documents submitted successfully',
       credentials:credentials
   })

 //}

   //const result = await User.create(user)
} catch (error) {
   console.log(error)
}
}


const getAllCarCredentials=async(req,res,next)=>{
  try {
    // const {page, limit} = req.query
    // if(page===0) return res.status(400).json({
    //     success: true,
    //     message:'invalide page'
    // })
    // const usePage = page-1
const allCarDoc = await oldPrivateCar.find({user_id:req.user.id})
if(!allCarDoc){
    res.status(404).json({
        success: false,
        message: "user info  not found"
    })
    // throw new Error('Users not found')
}
res.status(200).json({
    success: true,
    message: 'documents fetched successfully',
    allCarDoc: allCarDoc
})
} catch (error) {
    console.log(error)
}
}

const getSingleCarCredentials = async(req, res, next)=>{
  try {
    //console.log( req.files.originalname)
    var ObjectId = require('mongodb').ObjectID;
    const id = (req.params.id)
    if(id.length>24 || id.length<24) return res.status(400).json({message:'invalid id'})
    const singleCarDoc = await oldPrivateCar.findById(id)
    //const {car_license_image, licence_id, roadworthiness_image, roadworthiness_id, insurance_image, carrier_permit_image, heavy_goods_permit_image} = singleCarDoc
    //console.log( req.files.originalname)
     
    if(!singleCarDoc){
        res.status(404).json({
            success: false,
            message:'car documents not found'
        })
        // throw new Error('User not found')
    }
 
    if(JSON.stringify(singleCarDoc.user_id) !== JSON.stringify(req.user.id)){
        return res.status(403).json({
            message: 'user cannot get another user details'
        })
    }
 
    res.status(200).json({
        status: true,
        message: 'car document fetched successfully',
        userProfile: singleCarDoc
    })
   } catch (error) {
    console.log(error)
   }
}

const editCredentials = async (req, res) => {
  try {
     
    let filesPath;
    if (req.file) {
        filesPath = req.file.path; // We get file from multer
    }


      const id = req.params.id
      const files = await oldPrivateCar.findById(id)

      if(JSON.stringify(files.user_id) !== JSON.stringify(req.user.id)){
        return res.status(403).json({
            message: 'user cannot edit another user details'
        })
    }

      const fileName = (files.car_license_image)
      const fileName2 = files.roadworthiness_image
      const fileName3 = files.insurance_image
      
      


    const filePath= path.resolve(fileName)
    const filePath2= path.resolve(fileName2)
    const filePath3= path.resolve(fileName3)
    
    const pathArrr = [filePath,filePath2,filePath3]
    
      pathArrr.map(arr=>{
         fs.unlinkSync(arr,  (err) => { //rootfolder/upload/filename
            if (err) {

                return next(CustomErrorHandler.serverError(err.message));
            }
        });
      })
   
  
      const updateDoc = await oldPrivateCar.findByIdAndUpdate(
        id,
        {licence_id:req.body.licence_id, roadworthiness_id:req.body.roadworthiness_id,vin:re.body.vin, image:filesPath},
         {new:true}
      )
    console.log(req.file)
    res.status(200).json(updateDoc);
   
  } catch (err) {
    console.log(err);
  }
  };


 const deleteCredential = async (req, res) => {
    try {
      // Find user by id
      const id  = req.params.id
      const files = await oldPrivateCar.findById(id)
      if(JSON.stringify(files.user_id) !== JSON.stringify(req.user.id)){
        return res.status(403).json({
            message: 'user cannot delete another user details'
        })
    }
      const fileName = (files.car_license_image)
      const fileName2 = files.roadworthiness_image
      const fileName3 = files.insurance_image
      
      


    const filePath= path.resolve(fileName)
    const filePath2= path.resolve(fileName2)
    const filePath3= path.resolve(fileName3)
    
    const pathArrr = [filePath,filePath2,filePath3]
    
      pathArrr.map(arr=>{
         fs.unlinkSync(arr,  (err) => { //rootfolder/upload/filename
            if (err) {

                return next(CustomErrorHandler.serverError(err.message));
            }
        });
      })
   

      let file = await oldPrivateCar.findByIdAndRemove(id);
      // Delete image from cloudinary
      //await cloudinary.uploader.destroy(file.cloudinary_id);
      // Delete user from db
      res.json(file);
    } catch (err) {
      console.log(err);
    }
  };

  module.exports = {
    renewPrivateCarReg,
    editCredentials,
    deleteCredential,
    getAllCarCredentials,
    getSingleCarCredentials
  }