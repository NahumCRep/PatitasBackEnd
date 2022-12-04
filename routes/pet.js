const { Router } = require('express');

const router = Router();

const { uploadImage } = require('../controllers/cloudinary');

router.post('/image', uploadImage);

module.exports = router