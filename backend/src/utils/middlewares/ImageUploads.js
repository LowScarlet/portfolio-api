const sharp = require('sharp');
const { supabase } = require('../supabase');

const ImageUploads = (param) => async (req, res, next) => {
  const { files } = req;

  if (!files) {
    return next();
  }

  try {
    await Promise.all(Object.values(files).map(async (file) => {
      if (param[file.fieldname]) {
        const { dir, resize } = param[file.fieldname];
        if (process.env.NODE_ENV === 'production' || !supabase) {
          const processedImage = await sharp(file.buffer)
            .resize(resize)
            .toBuffer();

          // eslint-disable-next-line no-unused-vars
          const { data, error } = await supabase.storage.from(process.env.SUPABASE_STORAGE_BUCKET).upload(`./public/uploads/images/${dir}/${file.originalname}`, processedImage);

          if (error) {
            throw error;
          }
        } else {
          sharp(file.buffer).resize(resize).toFile(`./public/uploads/images/${dir}/${file.originalname}`, (err) => {
            if (err) {
              console.error(err);
            }
          });
        }
      }
    }));
  } catch (error) {
    // Handle the error appropriately, e.g., send an error response
    console.error('Image upload error:', error);
    return res.status(500).json({ error: 'Image upload failed' });
  }

  return next();
};

module.exports = ImageUploads;
