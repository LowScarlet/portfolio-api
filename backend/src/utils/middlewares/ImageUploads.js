const sharp = require('sharp');

const ImageUploads = (param) => async (req, res, next) => {
  const { files } = req;

  if (!files) {
    return next();
  }

  Object.values(files).forEach((file) => {
    if (param[file.fieldname]) {
      const { dir, resize } = param[file.fieldname];
      sharp(file.buffer).resize(resize).toFile(`./public/uploads/images/${dir}/${file.originalname}`, (err) => { if (err) console.error(err); });
    }
  });

  return next();
};

module.exports = ImageUploads;
