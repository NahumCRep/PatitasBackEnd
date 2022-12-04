const { reponse } = require('express');
const { uploadCloudinaryFile } = require('../helpers/uploadCloudinaryFile.js');

const uploadImage = async (req, res = reponse) => {

    const userID = 123456;

    try {
        // Upload the image
        const imgFile = req.body.file;
        const fileUploaded = await uploadCloudinaryFile({"userID": userID, "file": imgFile});

        res.json(fileUploaded);
    } catch (error) {
        console.error(error);
    }

}


module.exports = { uploadImage }