const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'dksphxskv', 
    api_key: '679462214673998', 
    api_secret: 'EiEeqLo9fmolV76G_NC4bDnzJNw'
  });

  module.exports = cloudinary;