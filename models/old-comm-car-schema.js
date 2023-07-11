const { string } = require('joi');
const mongoose = require('mongoose')


const oldCommercialCarSchema = new mongoose.Schema({
    // user_id:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: false,
    //     ref: 'User'
    // },
    //cloudinary_id: String,
   
    licence_id: String,
   
    roadworthiness_id: String,
    
        
    car_license_image: {
        // data: Buffer,
        type: String,
        required: true
    },
    roadworthiness_image: {
        // data: Buffer,
        type: String,
        //required: true
    },
    insurance_image: {
        // data: Buffer,
        type: String,
        //required: true
    },
    carrier_permit_image: {
        // data: Buffer,
        type: String,
        //required: true
    },
   heavy_goods_permit_image: {
        // data: Buffer,
        type: String,
       // required: true
    }
    
},
);
// { typeKey: '$type' }
const Image = mongoose.model("oldCommercialCar", oldCommercialCarSchema);
module.exports = Image