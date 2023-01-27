const { Router } = require('express');
const {
    createPublication,
    updatePublication,
    getUserPublications,
    getPublicationsByPetType,
    getPublication
} = require('../controllers/publication');

const router = Router();

router.post('/new', createPublication);
router.get('/:id', getPublication);
router.get('/:type', getPublicationsByPetType);
router.get('/user/:id', getUserPublications);
router.put('/update/:id', updatePublication);
// TODO: delete

module.exports = router;