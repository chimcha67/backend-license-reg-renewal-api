const express = require('express')
const userCntroller = require('../User-controller/user-controller')
const {validateToken} = require('../User-controller/validateUserToken')
const Router = express.Router()
const  userService  = require('../User-controller/user.services')
const ownerProfile = require('../User-controller/owner-info-controller')
const oldCommercialCarController = require('../User-controller/old-comm-car-controller')
const oldPrivateCarController = require('../User-controller/old-private-car-controller')
const newCarController = require('../User-controller/new-car-controller')
//const myUploads = require('../middleware/myUploads')
//const uploadmmobile = require('../middleware/myUploads')
const uploadFile = require('../middleware/upload')
const uploader = require('../middleware/uploader')



// var corsOptions = {
//     origin: 'http://example.com',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }

Router.get('/getProfile', ownerProfile.getProfile)
Router.get('/getAllDoc', newCarController.getAllCarCredentials)
Router.get('/allPrivateDoc', oldPrivateCarController.getAllCarCredentials)


Router.post('/create', userService.registration)
Router.get('/current',validateToken, userCntroller.currentUser)
Router.get('/', userCntroller.getAllUsers)
Router.get('/:id',validateToken, userCntroller.getSingleUser)
Router.put('/:id',validateToken, userService.update)
Router.delete('/:id', userCntroller.deleteUser)

Router.post('/login', userService.login )


Router.post('/profile',uploader.single('image'), ownerProfile.createProfile)
Router.get('/getProfile/:id', ownerProfile.getSingleUserProfile)
Router.put('/updateProfile/:id',uploader.single('image'), ownerProfile.updateUserProfile)
Router.delete('/deleteProfile/:id', ownerProfile.deleteUserProfile)




Router.post('/oldPrivate',uploadFile.fields([
    {name:'image'},
    {name:'image'},
    {name:'image'},
    {name:'image'}
]), oldPrivateCarController.renewPrivateCarReg)
Router.get('/singlePrivateDoc/:id', oldPrivateCarController.getSingleCarCredentials)
Router.put('/editPrivateDoc/:id', oldPrivateCarController.editCredentials)
Router.delete('/delPrivateDoc/:id', oldPrivateCarController.deleteCredential)




Router.post('/regNewCar',uploadFile.fields([
    {name:'image'},
    {name:'image'},
    {name:'image'},
    {name:'image'},
    {name:'image'},
    {name:'image'}
]), newCarController.newCarReg)
Router.get('/getSingleNewCar/:id', newCarController.getSingleCarCredentials)
Router.put('/editNewCar/:id', newCarController.editCredentials)
Router.delete('/delNewCar/:id', newCarController.deleteCredential)



// Router.get('/all', userCntroller.getUsers)
//Router.get('/del', userCntroller.deleteUser)
//Router.get('/getSingleUser', userCntroller.singleUser)

 

module.exports = Router