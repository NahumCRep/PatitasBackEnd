const { response } = require('express');
const Publication = require('../models/Publication');
const { uploadFilesToCloudinary } = require('../helpers/uploadCloudinaryFile');


const createPublication = async (req, res = response) => {
    try {
        const publication = req.body;
        // Getting Images Urls
        const profilePetImage = await uploadFilesToCloudinary(
            publication.publication_user, 
            publication.image
        );
        const extraImages = await uploadFilesToCloudinary(
            publication.publication_user, 
            publication.extra_images
        );
        
        // Setting Images Urls to publication
        publication.image = profilePetImage.url;
    
        const extraImagesUrl = extraImages.map((extraImg) => extraImg.url); 
        publication.extra_images = extraImagesUrl;


        // Publication - Creating and inserting in database
        const newPublication = new Publication(publication);
        await newPublication.save();

        return res.json({
            ok: true,
            message: 'Publicacion Creada con exito!!'
        });
    } catch (error) {
        console.error('Error - create Publication', error);
        return res.json({
            ok: false,
            message: error
        });
    }
}

const getUserPublications = async (req, res = response) => {
    try {
        const user = req.params.id;
        const userPublications = await Publication.find({publication_user: user});

        return res.json({
            ok: true,
            publications: userPublications,
            message: 'operation without errors'
        });
    } catch (error) {
        console.error('Error - user publications', error);
        return res.json({
            ok: false,
            message: error
        });
    }
}

const getPublicationsByPetType = () => {}
const getPublication = () => {}


module.exports = {
    createPublication,
    getUserPublications,
    getPublicationsByPetType,
    getPublication
}