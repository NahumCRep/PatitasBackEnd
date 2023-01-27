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

const deleteImageFromCloudinary = async (fileObject) => {
    const {userID, images} = fileObject;

    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        folder: `patitas/${userID}`,
    };

    try {
        if(Array.isArray(images)){
            const deletePromises = images.map(image => {
               return cloudinary.uploader.destroy(image, options)
            });

            const resp = await Promise.all(deletePromises);
            console.log(resp);
        }else {
            const resp = await cloudinary.uploader.destroy(file, options);
            console.log(resp);
        }
        
        return {
            ok: true,
            message: 'File deleted successfuly'
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Error on delete file'
        };
    }
}

module.exports = { uploadCloudinaryFile, uploadFilesToCloudinary, deleteImageFromCloudinary }