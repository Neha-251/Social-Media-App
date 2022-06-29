const cloudinary = require("cloudinary").v2;
require('dotenv').config()


cloudinary.config({
  cloud_name: process.env.ClOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// cloudinary.config({
//     cloud_name: "dj5w3kf2b",
//     api_key: "282416979452583",
//     api_secret: "GRIg9VwAtlD0DUgj-KXTSbtZRRY",
// });

module.exports = cloudinary;