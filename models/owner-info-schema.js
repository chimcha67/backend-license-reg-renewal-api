const mongoose = require('mongoose')

const OwnerInfoModel = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    cloudinary_id:{
        type:String
    },
    identity_card:{
        type: String,
        //required: [true, 'image is required']
    },
    first_name:{
        type: String,
        required: [true, 'name is required']
    },
    last_name:{
        type: String,
        required: [true, 'name is required']
    },
    identity_number:{
        type: String,
        required: [true, 'id number is required']
    },
    date_of_birth:{
        type: String,
        required: [true, 'age is required']
    },
   
    gender:{
        type: String,
        enum:['M','F'],
        required: [true, 'gender is required']
    },
    address:{
        type: String,
        required: [true, 'address is required']
    }
    
})

module.exports = mongoose.model('ownerInfo', OwnerInfoModel)