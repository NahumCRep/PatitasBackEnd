const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const { sendEmail, sendResetPasswordEmail } = require('../helpers/email-gmail-api');
// const { sendEmail } = require('../helpers/email-mailgun');

const createUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                ok:false,
                message: 'el correo ya se encuentra registrado'
            })
        } 

        user = new User(req.body);

        // Encriptra contrasena
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generateJWT(user.id, user.name);

        const emailExtraOptions = {
            text: 'Gracias por Registrarse en Patitas Web',
            template: 'registration',
            context: {
                name: user.name
            }
        }

        await sendEmail(email, 'Patitas Registro de Cuenta', emailExtraOptions);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            email: user.email,
            token
        })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            message: 'Error - Hable con el administrador'
        });
    } 
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        
        let user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({
                ok: false,
                message: 'el usuario no se encuentra registrado'
            })
        }


        const passwordValidation = bcrypt.compareSync(password, user.password);
        if(!passwordValidation){
            return res.status(400).json({
                ok: false,
                message: 'la contraseña no es correcta'
            });
        }

        const token = await generateJWT(user.id, user.name);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            email: user.email,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error - Hable con el administrador'
        });
    }
}

const renewToken = async (req, res) => {
    const {uid, name} = req;

    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    });
}

const forgotPassword = async (req, res) => {
    const {email} = req.body;
    try {
        const requestingUser = await User.findOne({email: email});

        if(!requestingUser){
            return res.status(200).json({
                ok: false,
                message: 'El correo no pertenece a ningun usuario'
            })
        }

        const token = await generateJWT(requestingUser._id, requestingUser.password);
        const link = `${process.env.FRONTEND_HOST}/reset_password/${requestingUser._id}/${token}`;
        
        const emailExtraOptions = {
            text: 'Cambio de Contraseña',
            template: 'resetpassword',
            context: {
                link
            }
        }
        const emailSended = await sendEmail(
            email, 
            'Patitas Reset Password', 
            emailExtraOptions
        );
        
        res.status(200).json({
            ok:true,
            message: 'correo enviado'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: 'Error - Hable con el administrador'
        });
    }
}

const resetPassword = async (req, res) => {
    const {id, token} = req.params
    const {password} = req.body
    try {
        if(!token || !id || !password){
            return res.status(400).json({
                ok: false,
                message: 'Missing data'
            })
        }

        const user = await User.findById(id)
        
        if(!user){
            return res.status(400).json({
                ok: false,
                message: 'User not found'
            })
        }

        const secret = process.env.SECRET_JWT_SEED
        const verify = jwt.verify(token, secret)
        

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        res.status(200).json({
            ok: true,
            message: 'contraseña actualizada'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            error
        })
    }
}


module.exports = {
    createUser,
    loginUser,
    renewToken,
    forgotPassword,
    resetPassword
}