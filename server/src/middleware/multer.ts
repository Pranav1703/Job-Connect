import multer from "multer"
// import path from "path"

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './src/storage')
//     },
//     filename: function (req, file, cb) {
      
//       cb(null, file.originalname )
      
//     }
//   })
  
// export const upload = multer({ 
//     storage: storage 
// })

const storage = multer.memoryStorage();

export const upload = multer({ storage });