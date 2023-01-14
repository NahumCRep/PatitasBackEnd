const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');
const bcrypt = require('bcryptjs');

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

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
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


module.exports = {
    createUser,
    loginUser,
    renewToken
}