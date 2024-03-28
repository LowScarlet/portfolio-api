function fileUploadName(file, dir = '') {
  const extArray = file.mimetype.split('/');
  const extension = extArray[extArray.length - 1];
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
  return `${dir}${file.fieldname}-${uniqueSuffix}.${extension}`;
}

module.exports = fileUploadName;
