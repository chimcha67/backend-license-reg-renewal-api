const { string } = require('joi');
const mongoose = require('mongoose')


const oldPrivateCarSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    cloudinary_id: String,
    car_license_image: {
        // data: Buffer,
        type: String,
        required: true
    },
    licence_id:{
        type: String,
        required: [true, 'pls insert car license id']
    },
    vin: {
        // data: Buffer,
        type: String,
        required: true
    },
    roadworthiness_image: {
        // data: Buffer,
        type: String,
        required: true
    },
    roadworthiness_id:{
        type: String,
        required: [true, 'pls insert car license id']
    },
    insurance_image: {
        // data: Buffer,
        type: String,
        required: true
    }
});
const Image = mongoose.model("oldPrivateCar", oldPrivateCarSchema);
module.exports = Image