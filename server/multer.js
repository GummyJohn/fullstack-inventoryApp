const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, '../client/inventoryApp/src/images/productImages')
  },

  filename: (req, file, cb) => {
    return cb(null, file.originalname)
  }
})

const upload = multer({storage: storage})

module.exports = upload;