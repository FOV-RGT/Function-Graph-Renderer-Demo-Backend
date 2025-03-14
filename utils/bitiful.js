const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');



const s3 = new AWS.S3({
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  }
});