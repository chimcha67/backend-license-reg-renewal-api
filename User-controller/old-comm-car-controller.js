const oldCommercialCar= require('../models/old-comm-car-schema')
const express = require('express')
 require("dotenv").config()
 const cloudinary = require('../controllers/cloudinary')
 const fs = require('fs')
 const path = require('path')


const controller = express()

const renewCommercialCar = async(req, res, file)=>{
    try {
         const { licence_id, roadworthiness_id}= req.body
      console.log(req.files);

        // if(!car_license_image|| licence_id|| roadworthiness_image || roadworthiness_id || insurance_image || !heavy_goods_permit_image || !carrier_permit_image){
        //     res.status(400).json({
        //         message: 'all fields are required'
        //     }
        //     )
            
        // }

        // submitting credentials
        let {payload} = req.body
        var imgUrl =''
        //if(req.file) var imgUrl= `files/img/${req.file.originalname}`
        //const result = await cloudinary.uploader.upload(req.file.path);
        //console.log(result)
        const uploader = async(path)=>await cloudinary.uploads(path)
          // payload.car_license_image = req.files.image[0]
          // payload.roadworthiness_image =req.files.image[1]
          // payload.insurance_image = req.files.image[2]
          // payload.carrier_permit_image=req.files.image[3]
          // payload.heavy_goods_permit_image = req.files.image[4]
        
      //  if(req.files){
      //   const urls = [];
      //   //const files = req.files;
      //   for (const file of req.files) {
      //     const { path } = file;
      //     const newPath = await uploader(path);
      //     urls.push(newPath);
      //   }
      
        
        
        //const credentials = await new oldCommercialCar(payload).save()
        
        const credentials = await oldCommercialCar.create({
            //user_id:req.user.id,
            //cloudinary_id: result.public_id,
            car_license_image:req.files.image[0].path,
            licence_id: licence_id,
            roadworthiness_image:req.files.image[1].path,
            roadworthiness_id: roadworthiness_id,
            
             insurance_image:req.files.image[2].path,
            carrier_permit_image:req.files.image[3].path,
            heavy_goods_permit_image:req.files.image[4].path
            
               
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

const getAllCarCredentials = async(req, res, next)=>{
  try {
      // const {page, limit} = req.query
      // if(page===0) return res.status(400).json({
      //     success: true,
      //     message:'invalide page'
      // })
      // const usePage = page-1
  const allCarDoc = await oldCommercialCar.find({})
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
   const singleCarDoc = await oldCommercialCar.findById(id)
   //const {car_license_image, licence_id, roadworthiness_image, roadworthiness_id, insurance_image, carrier_permit_image, heavy_goods_permit_image} = singleCarDoc
   //console.log( req.files.originalname)
    
   if(!singleCarDoc){
       res.status(404).json({
           success: false,
           message:'car documents not found'
       })
       // throw new Error('User not found')
   }

  //  if(JSON.stringify(singleCarDoc.user_id) !== JSON.stringify(req.user.id)){
  //      return res.status(403).json({
  //          message: 'user cannot get another user details'
  //      })
  //  }

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


      // const file = await oldCommercialCar.findById(req.param.id);
      // if (!file)
      //   return res.status(404)
      //   .send({
      //     message: "docs not found!"
      //   });


        // const updated = (
        //   file.car_license_image,
        //     file.licence_id,
        //     file.roadworthiness_image,
        //     file.roadworthiness_id,
        //      file.insurance_image,
        //    file.carrier_permit_image,
        //     file.heavy_goods_permit_image
        // )
        // if(updated){
        //   fs.unlinkSync(DIR + updated)
        // }
        const id = req.params.id
        const files = await oldCommercialCar.findById(id)
      const fileName = (files.car_license_image)
      const fileName2 = files.roadworthiness_image
      const fileName3 = files.insurance_image
      const fileName4 = files.carrier_permit_image
      const fileName5 = files.heavy_goods_permit_image
      


    const filePath= path.resolve(fileName)
    const filePath2= path.resolve(fileName2)
    const filePath3= path.resolve(fileName3)
    const filePath4= path.resolve(fileName4)
    const filePath5= path.resolve(fileName5)

    const pathArrr = [filePath,filePath2,filePath3,filePath4,filePath5]
    
    pathArrr.map(arr=>{
       fs.unlinkSync(arr,  (err) => { //rootfolder/upload/filename
          if (err) {

              return next(CustomErrorHandler.serverError(err.message));
          }
      });
    }) 
   
  //    await fs.unlinkSync(filePath,  (err) => { //rootfolder/upload/filename
  //     if (err) {
  //         return next(CustomErrorHandler.serverError(err.message));
  //     }
  // });
  // await fs.unlinkSync(filePath2,  (err) => { //rootfolder/upload/filename
  //     if (err) {
  //         return next(CustomErrorHandler.serverError(err.message));
  //     }
  // });
  // await fs.unlinkSync(filePath3,  (err) => { //rootfolder/upload/filename
  //     if (err) {
  //         return next(CustomErrorHandler.serverError(err.message));
  //     }
  // });
  // await fs.unlinkSync(filePath4,  (err) => { //rootfolder/upload/filename
  //     if (err) {
  //         return next(CustomErrorHandler.serverError(err.message));
  //     }
  // });
  // await fs.unlinkSync(filePath5, (err) => { //rootfolder/upload/filename
  //     if (err) {
  //         return next(CustomErrorHandler.serverError(err.message));
  //     }
  // });

      const { licence_id, roadworthiness_id}= req.body

        const updateDoc = await oldCommercialCar.findByIdAndUpdate(
          id,
          {licence_id:req.body.licence_id, roadworthiness_id:req.body.roadworthiness_id, image:filesPath},
           {new:true}
        )
      console.log(req.file)

        //await cloudinary.uploader.destroy(file.cloudinary_id);
        // Upload new image to cloudinary
        //const result = await cloudinary.uploader.upload(req.file.path);
        // const data = {
        //     user_id:req.user.id,
        //     cloudinary_id: result.public_id || file.cloudinary_id,
        //     car_license_image:result.secure_url,
        //     licence_id: result.secure_url,
        //     roadworthiness_image:result.secure_url,
        //     roadworthiness_id:result.secure_url,
        //     insurance_image:result.secure_url,
        //     carrier_permit_image:result.secure_url,
        //     heavy_goods_permit_image:result.secure_url
        //         //cloudinary_id: result.public_id || user.cloudinary_id,
        // };
      res.status(200).json(updateDoc);
     
    } catch (err) {
      console.log(err);
    }
  };


 const deleteCredential = async (req, res) => {
    try {
   
      const id = req.params.id
      const files = await oldCommercialCar.findById(id)
      const fileName = (files.car_license_image)
      const fileName2 = files.roadworthiness_image
      const fileName3 = files.insurance_image
      const fileName4 = files.carrier_permit_image
      const fileName5 = files.heavy_goods_permit_image
      


    const filePath= path.resolve(fileName)
    const filePath2= path.resolve(fileName2)
    const filePath3= path.resolve(fileName3)
    const filePath4= path.resolve(fileName4)
    const filePath5= path.resolve(fileName5)
    
    const pathArrr = [filePath,filePath2,filePath3,filePath4,filePath5]
    
      pathArrr.map(arr=>{
         fs.unlinkSync(arr,  (err) => { //rootfolder/upload/filename
            if (err) {

                return next(CustomErrorHandler.serverError(err.message));
            }
        });
      })
   
  //    await fs.unlinkSync(filePath,filePath2,filePath3,filePath4,filePath5,filePath6,  (err) => { //rootfolder/upload/filename
  //     if (err) {
  //         return next(CustomErrorHandler.serverError(err.message));
  //     }
  // });
  // await fs.unlinkSync(filePath2,  (err) => { //rootfolder/upload/filename
  //     if (err) {
  //         return next(CustomErrorHandler.serverError(err.message));
  //     }
  // });
  // await fs.unlinkSync(filePath3,  (err) => { //rootfolder/upload/filename
  //     if (err) {
  //         return next(CustomErrorHandler.serverError(err.message));
  //     }
  // });
  // await fs.unlinkSync(filePath4,  (err) => { //rootfolder/upload/filename
  //     if (err) {
  //         return next(CustomErrorHandler.serverError(err.message));
  //     }
  // });
  // await fs.unlinkSync(filePath5, (err) => { //rootfolder/upload/filename
  //     if (err) {
  //         return next(CustomErrorHandler.serverError(err.message));
  //     }
  // });
  
      
    // Find user by id
      let file = await oldCommercialCar.findByIdAndRemove(id);
      // const imagePath =  file._doc.image;

      // http://localhost:5000/uploads/1616444052539-425006577.png


        // const updated = (
        //   file.allCarDoc.car_license_image
        
        //   //   file.roadworthiness_image,
        //   //    file.insurance_image,
        //   //  file.carrier_permit_image,
        //   //   file.heavy_goods_permit_image
        // )
        // if(imagePath){
        //   fs.unlinkSync(DIR + imagePath)
        // }
      
      // fs.unlink(`${appRoot}/${imagePath}`, (err) => {
      //     if (err) {
      //         return next(CustomErrorHandler.serverError());
      //     }})
      // Delete image from cloudinary
      //await cloudinary.uploader.destroy(file.id);
      // Delete user from db
      //await file.remove();
      res.json({
        message: `deleted files successfully`,
        documents: file
      });
    } catch (err) {
      console.log(err);
    }
  };

  module.exports = {
    renewCommercialCar,
    editCredentials,
    deleteCredential,
    getAllCarCredentials,
    getSingleCarCredentials
  }