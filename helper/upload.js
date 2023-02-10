const util = require("util");
const multer = require("multer");
const path = require('path');
const maxSize = 2 * 1024 * 1024;


exports.storage = ({destination = ''}) => {
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __basedir + destination);
    },
    filename: (req, file, cb) => {
      console.log(file.originalname);
      cb(null, file.originalname);
    },
  });
};

exports.uploadFile = ({storage = ''}) => multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

const componentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    
    cb(null, process.cwd() + '/assets/component/');
  },
  filename: (req, file, cb) => {
    const date = new Date();
    const newFileName = date.getTime() + path.extname(file.originalname);
    const code_path = '/assets/component/' + newFileName;
    req.body.code_path = code_path;

    cb(null, newFileName);
  },
});

exports.uploadFileComponent = multer({
  storage: componentStorage,
  limits: { fileSize: maxSize },
}).single("file");

exports.uploadFileMiddleware = ({storage = ''}) => {
  util.promisify(uploadFile({storage: storage}));
};