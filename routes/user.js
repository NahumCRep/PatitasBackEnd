const { Router } = require('express');
const { getUserInfo, updateUserInfo } = require('../controllers/user');
const router = Router();


router.get('/:id/info', getUserInfo);
router.put('/:id/update', updateUserInfo);

module.exports = router;
