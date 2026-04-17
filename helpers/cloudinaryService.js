const cloudinary = require("../configs/cloudinary");

const cloudinaryService = async ({mimetype,imgBuffer})=> {
    try {

    const dataUrl = `data:${mimetype};base64,${imgBuffer.toString('base64')}`
    const result = await cloudinary.uploader.upload(dataUrl);
    console.log(result.secure_url);
    return result.secure_url;
    } catch (error) {
        
    }
}

module.exports = {cloudinaryService}