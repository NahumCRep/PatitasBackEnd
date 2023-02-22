const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/jwt-validator');
const { createUser, loginUser, renewToken, forgotPassword, resetPassword } = require('../controllers/auth');

const router = Router();

router.post('/', 
[ // middlewares
    check('email', 'Debe ingresar el correo').isEmail(),
    check('password', 'Debe ingresar la contrasena').not().isEmpty(),
    validateFields
], loginUser);

router.post('/new', 
[ // middlewares
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'Debe ingresar una contrasena').not().isEmpty(),
    validateFields
], createUser);

router.get('/renew', validateJWT, renewToken);

router.post('/forgot_password',[
    check('email', 'El correo es obligatorio').isEmail(),
    validateFields
], forgotPassword);

router.put('/reset_password/:id/:token', resetPassword);

module.exports = router;