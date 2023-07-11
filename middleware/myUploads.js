// const multer = require("multer");


// // const storage = multer.diskStorage({
// //     destination: (req,file,cb) => {
// //         cb(null,"image");
// //     },
// //     filename: (req, file, cb) => {
// //         // console.log(file.originalname);
// //         return cb(null,file.originalname);
// //       },
// // });

// //const multer = require("multer");
// const bodyParser = require('body-parser')
// const path = require('path');
// const maxSize = 2 * 1024 * 1024;
// const uploadFile = require('../middleware/upload');
// const myUploads = require("../middleware/myUploads");

// // const app = express()
// // app.use(
// //   express.json()
// // )

// // app.use(bodyParser.json());

//  const storage=multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null,path.join(__dirname) , '../uploads', (err, success)=>{
//       if(err){
//         console.log(err)
//       }
//     });
//   },
//   filename: (req, file, cb) => {
//     console.log(file.originalname);
//     const name = Date.now()+ '-' + file.originalname
//     cb(null, name, (err, success)=>{
//       if(err){
//         console.log(err)
//       }
//     });
//   },
// });

// let uploadmmobile = multer({
//   storage: storage,
//   limits: { fileSize: maxSize },
// });


// // const myUploads = multer({
// //     storage: storage
// // })



// module.exports = uploadmmobile;






















// var multer = require('multer');
// module.exports.files={
//     storage:function(){
//         var storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//           cb(null, 'public/files/')
//         },
//         filename: function (req, file, cb) {
//             cb(null, file.originalname)
//         }
//       })
      
//       return storage;
// },
// allowedFiles:function(req, file, cb) {
//     // Accept images only
//     if (!file.originalname.match(/\.(pdf|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
//         req.fileValidationError = 'Only pdf|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF file type are allowed!';
//         return cb(new Error('Only pdf|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF file type  are allowed!'), false);
//     }
//     cb(null, true);
// }
// }












// const { GridFsStorage } = require("multer-gridfs-storage");
// const dbConfig = require("../config/db");

// var storage = new GridFsStorage({
//   url: dbConfig.url + dbConfig.database,
//   options: { useNewUrlParser: true, useUnifiedTopology: true },
//   file: (req, file) => {
//     const match = ["image/png", "image/jpeg"];

//     if (match.indexOf(file.mimetype) === -1) {
//       const filename = `${Date.now()}-bezkoder-${file.originalname}`;
//       return filename;
//     }

//     return {
//       bucketName: dbConfig.imgBucket,
//       filename: `${Date.now()}-bezkoder-${file.originalname}`
//     };
// }
// });

// var uploadFiles = multer({ storage: storage }).single("file");
// var uploadFilesMiddleware = util.promisify(uploadFiles);
// module.exports = uploadFilesMiddleware;