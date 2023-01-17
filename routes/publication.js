const { Router } = require('express');
const {
    createPublication,
    getUserPublications,
    getPublicationsByPetType,
    getPublication
} = require('../controllers/publication');

const router = Router();

router.post('/new', createPublication);
router.get('/:id', getPublication);
router.get('/:type', getPublicationsByPetType);
router.get('/user/:id', getUserPublications);
// TODO: update and delete

module.exports = router;