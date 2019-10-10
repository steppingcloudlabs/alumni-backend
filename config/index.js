const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  JWT_SECRET: "authentication",
  port: 4000,
  aws_access_key:process.env.AWS_ACCESS_KEY_ID,
  aws_secret_key:process.env.AWS_SECRET_ACCESS_KEY,
  aws_bucket_name:process.env.AWS_BUCKET_NAME


};
