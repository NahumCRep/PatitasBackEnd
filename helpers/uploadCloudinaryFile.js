const { cloudinary } = require('../config/cloudinary');

const uploadCloudinaryFile = async (fileObject) => {
    const {userID, file} = fileObject;

    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: false,
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

const deleteImageFromCloudinary = async (userID, images) => {

    const options = {
        resource_type: 'image'
    };

    try {
        if(Array.isArray(images)){
            const deletePromises = images.map(image => {
               return cloudinary.uploader.destroy(`patitas/${userID}/${image}`, options)
            });

            const resp = await Promise.all(deletePromises);
            console.log(resp);
        }else {
            const resp = await cloudinary.uploader.destroy(images, options);
            console.log(resp);
        }
        
        return {
            ok: true,
            message: 'Files deleted sucessfully'
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Error on delete file'
        };
    }
}

const getNamesOfImages = (images) => {
    let namesList = images.map(image => {
        // -->>> first split - slice - join -> get image name with extension
        // ->> second split -slice - join -> get image name without extension
        return image.split('/').slice(-1).join('')
                    .split('.').slice(0,1).join('')
    })
   
   return namesList;
}

module.exports = { 
    uploadCloudinaryFile, 
    uploadFilesToCloudinary, 
    deleteImageFromCloudinary,
    getNamesOfImages
}