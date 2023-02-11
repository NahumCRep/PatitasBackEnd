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

            if(!passwordValidation){
                return res.status(200).json({
                    ok: false,
                    message: 'la contraseña actual no es correcta'
                });
            }

            // Crypt new password
            const salt = bcrypt.genSaltSync();
            const newPassword = bcrypt.hashSync(newUserData.password, salt);
            newPasswordData = { password: newPassword }
        }

        // Validate that new email doesnt already exist with other user
        if(newUserData.email){
            const sameEmail = await User.find({_id: { $ne: userId }, email: newUserData.email})
            if(sameEmail.length > 0){
                return res.status(200).json({
                    ok: false,
                    message: 'El correo ya se encuentra registrado por otro usuario!'
                })
            }
        }

        // If its all right then....
        let message = '';
        if(newPasswordData.password){
            await User.findByIdAndUpdate(userId, {$set: newPasswordData});
            message = 'Contraseña actualizada correctamente!'    
        }else {
            await User.findByIdAndUpdate(userId, {$set: {name: newUserData.name, email:newUserData.email}});
            message = 'Usuario actualizado correctamente!'
        }

        res.status(200).json({
            ok: true,
            message: message,
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