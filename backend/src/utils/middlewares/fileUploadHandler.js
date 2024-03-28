const B2 = require('backblaze-b2');
const fileUploadName = require('../fileUploadName');

async function fileUploadHandler(dir, file) {
  try {
    const b2 = new B2({
      applicationKeyId: process.env.BACKBLAZE_KEY_ID,
      applicationKey: process.env.BACKBLAZE_KEY,
    });

    await b2.authorize();
    const { data: uploadData } = await b2.getUploadUrl({
      bucketId: process.env.BACKBLAZE_BUCKET_ID,
    });

    const params = {
      uploadUrl: uploadData.uploadUrl,
      uploadAuthToken: uploadData.authorizationToken,
      fileName: fileUploadName(file, dir),
      data: file.buffer,
    };

    const { data } = await b2.uploadFile(params);
    const { data: buckets } = await b2.getBucket({});
    const { bucketName } = buckets.buckets.find((bucket) => bucket.bucketId === process.env.BACKBLAZE_BUCKET_ID);
    data.fileUrl = `https://f005.backblazeb2.com/file/${bucketName}/${data.fileName}`;
    return data;
  } catch (error) { /* empty */ }
  return null;
}

module.exports = fileUploadHandler;
