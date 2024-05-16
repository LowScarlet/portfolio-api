const multer = require('multer');

const multerHandler = multer({ storage: multer.memoryStorage() });

module.exports = multerHandler;
