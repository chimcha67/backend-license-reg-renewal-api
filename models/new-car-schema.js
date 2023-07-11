const { string } = require('joi');
const mongoose = require('mongoose')


const newCarSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    //cloudinary_id: String,
    owner_passport:{
        type: String,
        required: [true, 'pls insert passport']
    },
    attestation_letter_image: {
        // data: Buffer,
        type: String,
        required: true
    },
    purchase_receipt_image: {
        // data: Buffer,
        type: String,
        required: true
    },
    delivery_note_image: {
        // data: Buffer,
        type: String,
        required: true
    },
    proof_of_ownership_image: {
        // data: Buffer,
        type: String,
        required: true
    },
    driver_license_image: {
        // data: Buffer,
        type: String,
        required: true
    },
   
    licence_id:{
        type: String,
        required: [true, 'pls insert car license id']
    },
    // current_add_proof:{
    //     type: String,
    //     required: [true, 'pls insert car license id']
    // },
    
    date:{
        type:Date,
        default:Date.now
    }
    
});
const Image = mongoose.model("newCar", newCarSchema);
module.exports = Image