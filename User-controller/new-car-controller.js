const newCar= require('../models/new-car-schema')
const express = require('express')
 require("dotenv").config()
 const cloudinary = require('../controllers/cloudinary')
 const path = require('path')
 const fs = require('fs')



const controller = express()

const newCarReg = async(req, res, file)=>{
    try {
        const {licence_id}= req.body
       

        // if(!owner_passport|| !licence_id|| !attestation_letter_image || !purchase_receipt_image|| !delivery_note_image || !proof_of_ownership_image || !driver_license_image){
        //     res.status(400).json({
        //         message: 'all fields are required'
        //     }
        //     )
            
        // }

        // submitting credentials
        //const result = await cloudinary.uploader.upload(req.file.path,{width:500,heigth:500});
        
        const credentials = await newCar.create({
            user_id:req.user.id,
            //cloudinary_id: result.public_id,
            licence_id: licence_id,
            owner_passport:req.files.image[0].path,
            attestation_letter_image:req.files.image[1].path,
            purchase_receipt_image:req.files.image[2].path,
            delivery_note_image:req.files.image[3].path,
            proof_of_ownership_image:req.files.image[4].path,
            driver_license_image:req.files.image[5].path
            
               
            })
        // const user = await new User ({
        //     name: name,
        //     age: age,
        //     email: email,
        //     gender: gender,
        //     password: password
        // })
        // await user.save()
        if(!credentials) return res.status(500).json({
            status: false,
            message: 'something went wrong'
        })
        res.status(201).json({
            success: true,
            message: 'user created successfully',
            credentials:credentials
        })

       
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
    const allCarDoc = await newCar.find()
    if(!users){
        res.status(404).json({
            success: false,
            message: "car info  not found"
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
     const id = req.params.id
     if(id.length>24 || id.length<24) return res.status(400).json({message:'invalid id'})
     const singleCarDoc = await newCar.findById(id)
 
     if(!singleCarDoc){
         res.status(404).json({
             success: false,
             message:'car docs not found'
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
         message: 'car docs fetched successfully',
         userProfile: singleCarDoc
     })
    } catch (error) {
     console.log(error)
    }
 }
 

const editCredentials = async (req, res) => {
    try {
      let file = await newCar.findbyId(req.param.id);
      let filesPath;
      if (req.file) {
          filesPath = req.file.path; // We get file from multer
      }

    //     if (req.file) {
    //       fs.unlink(`${appRoot}/${filePath}`, (err) => { //rootfolder/upload/filename
    //           if (err) {
    //               return next(CustomErrorHandler.serverError(err.message));
    //           }
    //       });    
    //   }

      const id = req.params.id
      const files = await newCar.findById(id)
      const fileName = files.owner_passport
        const fileName2 = files.attestation_letter_image
        const fileName3 = files.purchase_receipt_image
        const fileName4 = files.delivery_note_image
        const fileName5 = files.proof_of_ownership_image
        const fileName6 = files.driver_license_image


      const filePath= path.resolve(fileName)
      const filePath2= path.resolve(fileName2)
      const filePath3= path.resolve(fileName3)
      const filePath4= path.resolve(fileName4)
      const filePath5= path.resolve(fileName5)
      const filePath6= path.resolve(fileName6)
     
    await fs.unlinkSync(filePath,  (err) => { //rootfolder/upload/filename
        if (err) {
            return next(CustomErrorHandler.serverError(err.message));
        }
    });
    await fs.unlinkSync(filePath2,  (err) => { //rootfolder/upload/filename
        if (err) {
            return next(CustomErrorHandler.serverError(err.message));
        }
    });
    await fs.unlinkSync(filePath3,  (err) => { //rootfolder/upload/filename
        if (err) {
            return next(CustomErrorHandler.serverError(err.message));
        }
    });
    await fs.unlinkSync(filePath4,  (err) => { //rootfolder/upload/filename
        if (err) {
            return next(CustomErrorHandler.serverError(err.message));
        }
    });
    await fs.unlinkSync(filePath5, (err) => { //rootfolder/upload/filename
        if (err) {
            return next(CustomErrorHandler.serverError(err.message));
        }
    });
    await fs.unlinkSync(filePath6,  (err) => { //rootfolder/upload/filename
        if (err) {
            return next(CustomErrorHandler.serverError(err.message));
        }
    });
        const updateDoc = await oldCommercialCar.findByIdAndUpdate(
          id,
          {licence_id:req.body.licence_id, image:filesPath},
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
      const id = req.params.id
      const files = await newCar.findById(id)
      const fileName = files.owner_passport
        // files.attestation_letter_image, 
        // files.purchase_receipt_image, 
        // files.delivery_note_image, 
        // files.proof_of_ownership_image, 
        // files.driver_license_image)
        const fileName2 = files.attestation_letter_image
        const fileName3 = files.purchase_receipt_image
        const fileName4 = files.delivery_note_image
        const fileName5 = files.proof_of_ownership_image
        const fileName6 = files.driver_license_image


      const filePath= path.resolve(fileName)
      const filePath2= path.resolve(fileName2)
      const filePath3= path.resolve(fileName3)
      const filePath4= path.resolve(fileName4)
      const filePath5= path.resolve(fileName5)
      const filePath6= path.resolve(fileName6)
     
       await fs.unlinkSync(filePath,filePath2,filePath3,filePath4,filePath5,filePath6,  (err) => { //rootfolder/upload/filename
        if (err) {
            return next(CustomErrorHandler.serverError(err.message));
        }
    });
    await fs.unlinkSync(filePath2,  (err) => { //rootfolder/upload/filename
        if (err) {
            return next(CustomErrorHandler.serverError(err.message));
        }
    });
    await fs.unlinkSync(filePath3,  (err) => { //rootfolder/upload/filename
        if (err) {
            return next(CustomErrorHandler.serverError(err.message));
        }
    });
    await fs.unlinkSync(filePath4,  (err) => { //rootfolder/upload/filename
        if (err) {
            return next(CustomErrorHandler.serverError(err.message));
        }
    });
    await fs.unlinkSync(filePath5, (err) => { //rootfolder/upload/filename
        if (err) {
            return next(CustomErrorHandler.serverError(err.message));
        }
    });
    await fs.unlinkSync(filePath6,  (err) => { //rootfolder/upload/filename
        if (err) {
            return next(CustomErrorHandler.serverError(err.message));
        }
    });
      // Find user by id
      let file = await newCar.findByIdAndRemove(id);
    //   if (req.file) {
    //     fs.unlink(`${appRoot}/${filePath}`, (err) => { //rootfolder/upload/filename
    //         if (err) {
    //             return next(CustomErrorHandler.serverError(err.message));
    //         }
    //     });    
    // }
   
      res.json({
        message:'deleted successfully',
        documents_deleted: file
      });
    } catch (err) {
      console.log(err);
    }
  };

  module.exports = {
    newCarReg,
    editCredentials,
    deleteCredential,
    getAllCarCredentials,
    getSingleCarCredentials
  }