const multer = require("multer");
const path = require("path");
const req = require("express/lib/request");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(null, "../uploads"));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,  uniqueSuffix + '-' + file.originalname)
    }
})



module.exports = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      let ext = path.extname(file.originalname);  
      if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        cb(new Error("File type is not supported"), false);
        return;
      }
      cb(null, true);
    },
});

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "../uploads");
//     },
//     filename: function (req, file, cb) {
      
//       cb(null,  file.originalname)
//     }
// })

// const upload = multer({ storage: storage })

// const fileFilter = (req, file, callback) =>{

//     if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         callback(null, true);
//     } else {
//         callback(null, false);

//     }
   
// }
  

// const options = multer({
//     storage,
//     fileFilter,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     }
// })

// const uploads = multer(options);

// module.exports = uploads;