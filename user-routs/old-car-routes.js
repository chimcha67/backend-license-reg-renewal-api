const oldCommercialCarController = require('../User-controller/old-comm-car-controller')
const uploadFile = require('../middleware/upload')
const {validateToken} = require('../User-controller/validateUserToken')
const express = require('express')
const ownerProfile = require('../User-controller/owner-info-controller')
const  userService  = require('../User-controller/user.services')



const Router = express.Router()


 //Router.get('/getProfile', ownerProfile.getProfile)


Router.post('/oldCarReg',validateToken, uploadFile.fields([
    {name:'image'},
    {name:'image'},
    {name:'image'},
    {name:'image'},
    {name:'image'},
    
]), userService.oldCommercialCar)
Router.get('/allOldCommerDoc',validateToken, oldCommercialCarController.getAllCarCredentials)
Router.get('/singleCommerDoc/:id',validateToken, oldCommercialCarController.getSingleCarCredentials)
Router.put('/user/editOldCommerDoc/:id',validateToken, uploadFile.fields([
    {name:'image'},
    {name:'image'},
    {name:'image'},
    {name:'image'},
    {name:'image'},
    
]), userService.editOldCommercialCar)
Router.delete('/delOldCommDoc/:id',validateToken, oldCommercialCarController.deleteCredential)





module.exports = Router
