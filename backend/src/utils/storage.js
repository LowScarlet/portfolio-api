const { S3Client } = require('@aws-sdk/client-s3');

const config = {
  forcePathStyle: true,
  region: process.env.AWS_S3_REGION,
  endpoint: process.env.AWS_S3_END_POINT,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    accessSecretKey: process.env.AWS_S3_ACCESS_SECRET_KEY,
  }
};

console.log(config);

const storage = new S3Client(config);

module.exports = { storage };
