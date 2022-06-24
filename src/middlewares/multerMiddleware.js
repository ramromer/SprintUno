// let multer = require("multer");
// let path = require("path");



// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/images");
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
//   },
// });

//    let uploadFile = multer({storage:storage}).single('image');

// module.exports = uploadFile;

const upload = async (req, res, next) => {
    try {
      await uploadFile(req, res);
      if (req.file == undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
      }
      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file.originalname,
      });
      next();
    } catch (err) {
      res.status(500).send({
        message: `Could not upload the file: ${req.file.originalname}. ${err}`,
      });
    }
  };

  module.exports =   upload
