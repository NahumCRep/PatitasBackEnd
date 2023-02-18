const { Router } = require('express');
const {
    createPublication,
    updatePublication,
    deletePublication,
    getUserPublications,
    getUserLikedPublications,
    getPublicationsByPetType,
    getPublication,
    handleLike,
    getCounts
} = require('../controllers/publication');

const router = Router();

router.post('/new', createPublication);
router.get('/:id', getPublication);
router.put('/:id/like', handleLike);
router.get('/type/:type', getPublicationsByPetType);
router.get('/type/:type/page/:page', getPublicationsByPetType);
router.get('/type/:type/province/:province', getPublicationsByPetType);
router.get('/type/:type/province/:province/page/:page', getPublicationsByPetType);
router.get('/user/:id', getUserPublications);
router.get('/user/:id/likes', getUserLikedPublications);
router.put('/update/:id', updatePublication);
router.delete('/delete/:id', deletePublication);
router.get('/counters/all', getCounts);

module.exports = router;