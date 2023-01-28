const { response } = require('express');
const Publication = require('../models/Publication');
const { 
    uploadFilesToCloudinary, 
    deleteImageFromCloudinary,
    getNamesOfImages 
} = require('../helpers/uploadCloudinaryFile');


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
    try {
        const publicationId = req.params.id
        const publication = req.body;

        const publicationStored = await Publication.findById(publicationId)

        if (publication.image !== publicationStored.image) {
            // TODO: delete prev image from cloudinary and upload the new
            console.log('nueva imagen de perfil');
        }

        // Verify extra images ..............................
        // --->>> upload and get urls when stored publication extra_images are empty
        if (publicationStored.extra_images.length === 0) {
            const extraImages = await uploadFilesToCloudinary(
                publication.publication_user,
                publication.extra_images
            );

            const extraImagesUrl = extraImages.map((extraImg) => extraImg.url);
            publication.extra_images = extraImagesUrl;
        } else {
            let imagesToUpload = publication.extra_images.filter(
                (image) => !image.includes('cloudinary.com'));

            let imagesToDelete = publicationStored.extra_images.filter(
                (image) => !publication.extra_images.includes(image));

            // -->>> Get url for new images and set to publication field
            if (imagesToUpload.length > 0) {
                const extraImages = await uploadFilesToCloudinary(
                    publication.publication_user,
                    imagesToUpload
                );

                const extraImagesUrl = extraImages.map((extraImg) => extraImg.url);
                const cloudyImages = publication.extra_images.filter(
                    (image) => image.includes('cloudinary.com')
                )
                publication.extra_images = [...cloudyImages, ...extraImagesUrl];
            }

            // -->>> deleting no needed images of database publication 
            if (imagesToDelete.length > 0) {
                const imagesNames = getNamesOfImages(imagesToDelete)
                console.log('name', imagesNames)
                await deleteImageFromCloudinary(
                    publication.publication_user,
                    imagesNames
                )
            }        
        }

        const resp = await Publication.findByIdAndUpdate(publicationId, publication); 
        console.log(resp);

        res.json({
            ok: true,
            message: 'Publication updloaded sucessfully'
        })
    } catch (error) {
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
        const userPublications = await Publication.find({ publication_user: user });

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


const getPublicationsByPetType = () => { }


module.exports = {
    createPublication,
    updatePublication,
    getUserPublications,
    getPublicationsByPetType,
    getPublication
}