const { cloudinary } = require('../utils/cloudinary');

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

module.exports = { uploadCloudinaryFile }