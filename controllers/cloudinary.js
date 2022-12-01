const { reponse } = require('express');
const { cloudinary } = require('../utils/cloudinary');

const uploadImage = async (req, res = reponse) => {

    const userID = 123456;

    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        folder: `patitas/${userID}`,
    };

    const upload_preset = 'patitas_app'

    try {
        // Upload the image
        const imagePath = req.body.imgUrl;
        const result = await cloudinary.uploader.upload(imagePath, options);
        console.log(result);
        res.json({
            ok: true,
            imageR: result.public_id,
            url: result.url
        })
        // return result.public_id;
    } catch (error) {
        console.error(error);
    }

}


module.exports = { uploadImage }