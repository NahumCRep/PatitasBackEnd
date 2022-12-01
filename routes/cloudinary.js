const { Router } = require('express');

const router = Router();

const { uploadImage } = require('../controllers/cloudinary');

router.post('/', uploadImage);

module.exports = router