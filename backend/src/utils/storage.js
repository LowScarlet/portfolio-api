const { S3Client } = require('@aws-sdk/client-s3');

const storage = new S3Client({
  forcePathStyle: true,
  region: process.env.AWS_S3_REGION,
  endpoint: process.env.AWS_S3_END_POINT,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    accessSecretKey: process.env.AWS_S3_ACCESS_SECRET_KEY,
  }
});

module.exports = { storage };
