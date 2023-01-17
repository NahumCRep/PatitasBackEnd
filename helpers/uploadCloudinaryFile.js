const { cloudinary } = require('../config/cloudinary');

const uploadCloudinaryFile = async (fileObject) => {
    const {userID, file} = fileObject;

    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        folder: `patitas/${userID}`,
    };

    try {
        const resp = await cloudinary.uploader.upload(file, options);
        return {
            ok: true,
            url: resp.url 
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            url: null
        };
    }
}

const uploadFilesToCloudinary = async (userId, files) => {
    try {
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            folder: `patitas/${userId}`,
        };

        if(Array.isArray(files)){
            const allUploadPromises = files.map((file) => {
                return cloudinary.uploader.upload(file, options)
            }); 
    
            const cloudinaryImages = await Promise.all(allUploadPromises);
            return cloudinaryImages;
        }else{
            const cloudinaryImage = await cloudinary.uploader.upload(files, options);
            return cloudinaryImage
        }
        
    } catch (error) {
        console.error('cloudinary - helper', error);
    }
}

module.exports = { uploadCloudinaryFile, uploadFilesToCloudinary }