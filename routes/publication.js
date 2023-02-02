const { Router } = require('express');
const {
    createPublication,
    updatePublication,
    deletePublication,
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
router.delete('/delete/:id', deletePublication);

module.exports = router;