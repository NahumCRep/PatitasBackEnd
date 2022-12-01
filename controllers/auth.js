const createUser = (req, res) => {
    const {name, email, password} = req.body;
    
    res.json({
        ok: true,
        action: 'sign up',
        name,
        email,
        password
    })
}

const loginUser = (req, res) => {
    const {email, password} = req.body;

    res.json({
        ok: true,
        action: 'login',
        email,
        password
    })
}

const renewToken = (req, res) => {
    res.json({
        ok: true,
        action: 'renew'
    })
}

module.exports = {
    createUser,
    loginUser,
    renewToken
}