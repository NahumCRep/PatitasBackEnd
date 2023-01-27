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

const updatePublication = async (req, res) => {
    try{
        const publicationId = req.params.id
        const publication = req.body;

        const resp = await Publication.findByIdAndUpdate(publicationId, publication); 
        
        res.json({
            ok: true,
            message: 'Publication updloaded sucessfully'
        })
    }catch (error){
        console.log(error)
        res.json({
            ok: false,
            message: 'Publication fail on update'
        })
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

const getPublication = async (req, res = response) => {
    try {
        const productId = req.params.id;
        const publication = await Publication.findById(productId);

        return res.json({
            ok: true,
            publication: publication,
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


module.exports = {
    createPublication,
    updatePublication,
    getUserPublications,
    getPublicationsByPetType,
    getPublication
}