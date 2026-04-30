const cloudinary = require("../configs/cloudinary")

const UploadToCloudinary = async ({mimetype, bufferString})=> {
    try {

        const dataUrl = `data:${mimetype};base64,${bufferString.toString("base64")}`
        const res = await cloudinary.uploader.upload(dataUrl);
        // console.log(res.secure_url);
        return res.secure_url;

    } catch (error) {
        console.log(error);
    }
}

const deleteFromCloudinary = async (url)=> {
    
    const publicId = url.split("/").pop().split(".").shift()
    // console.log(publicId);
    cloudinary.uploader.destroy(publicId, function(error, result) {
        console.log(result);
      });
}
module.exports= {UploadToCloudinary, deleteFromCloudinary}  