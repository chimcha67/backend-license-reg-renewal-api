const oldCommercialCarController = require('../User-controller/old-comm-car-controller')
const uploadFile = require('../middleware/upload')
const {validateToken} = require('../User-controller/validateUserToken')
const express = require('express')
const ownerProfile = require('../User-controller/owner-info-controller')
const  userService  = require('../User-controller/user.services')



const Router = express.Router()


 //Router.get('/getProfile', ownerProfile.getProfile)


Router.post('/oldCarReg',uploadFile.fields([
    {name:'image'},
    {name:'image'},
    {name:'image'},
    {name:'image'},
    {name:'image'},
    
]), userService.oldCommercialCar)
Router.get('/allOldCommerDoc', oldCommercialCarController.getAllCarCredentials)
Router.get('/user/singleCommerDoc/:id', oldCommercialCarController.getSingleCarCredentials)
Router.put('/user/editOldCommerDoc/:id',uploadFile.fields([
    {name:'image'},
    {name:'image'},
    {name:'image'},
    {name:'image'},
    {name:'image'},
    
]), userService.editOldCommercialCar)
Router.delete('/delOldCommDoc/:id', oldCommercialCarController.deleteCredential)





module.exports = Router