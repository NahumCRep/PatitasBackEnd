const { reponse } = require('express');
const { deleteImageFromCloudinary} = require('../helpers/uploadCloudinaryFile.js');

const deleteImg = async (req, res = reponse) => {
    const {userId, imageName} = req.body
    try {
        const res = await deleteImageFromCloudinary({userId, imageName})
        return res.json({
            ok: true,
            message: 'File deleted successfuly'
        })
    } catch (error) {
        console.log(error)
        return res.json({
            ok: false,
            message: error
        })
    }
}


module.exports = { deleteImg }