const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
    const token = req.header('x-token');
    
    if(!token) {
        return res.status(401).json({
            ok: false,
            message: 'no hay token en la peticion'
        })
    }

    try {
        const {uid, name} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        )

        req.uid = uid;
        req.name= name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: 'token no valido'
        })
    }

    next();
}

module.exports = {
    validateJWT
}