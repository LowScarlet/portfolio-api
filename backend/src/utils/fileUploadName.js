const { v4: uuidv4 } = require('uuid');

function fileUploadName(file) {
  const uuid = uuidv4();
  const fileExtension = file.originalname.split('.').pop();
  return `${Date.now()}-${uuid}.${fileExtension}`;
}

module.exports = fileUploadName;
