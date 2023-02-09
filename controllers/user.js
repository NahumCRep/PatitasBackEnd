const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const { sendEmail } = require('../helpers/email-gmail-api');

const getUserInfo = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                ok: false,
                message: 'usurio no encontrado'
            })
        }

        res.status(400).json({
            ok: true,
            uid: user._id,
            name: user.name,
            email: user.email
        })
         
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error al buscar al usuario'
        })
    }
}

const updateUserInfo = async (req, res) => {
    try {
        const userId = req.params.id;
        const newUserData = req.body;
        const storedUser = await User.findById(userId);
       
        // Validate if its password change
        let newPasswordData = {};
        if(req.body.password){
            // Validate if current password is correct
            const passwordValidation = bcrypt.compareSync(
                newUserData.currentPassword, 
                storedUser.password
            );

            if(passwordValidation){
                return res.status(400).json({
                    ok: false,
                    message: 'la contraseña actual no es correcta'
                });
            }

            // Crypt new password
            const salt = bcrypt.genSaltSync();
            const newPassword = bcrypt.hashSync(newUserData.password, salt);
            newPasswordData = { password: newPassword }
        }


        let message = '';
        let user = {};
        if(newPasswordData.password){
            user = await User.findByIdAndUpdate(userId, {$set: newPasswordData});
            message = 'Contraseña actualizada correctamente!'
        }else {
            user = await User.findByIdAndUpdate(userId, {$set: newUserData});
            message = 'Usuario actualizado correctamente!'
        }

        res.status(400).json({
            ok: true,
            message: message,
            user
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error al actualizar datos de usuario',
            error
        })
    }
}



module.exports = {
    getUserInfo,
    updateUserInfo
}