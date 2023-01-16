const authCredentials = {
    username: 'api', 
    key: process.env.MAILGUN_PRIVATE_KEY
}

const DOMAIN = process.env.MAILGUN_DOMAIN;

const mailOptions = (email_to, subject) => {
    return {
        from: `patitas <me@samples.mailgun.org>`,
        to: email_to,
        subject: subject,
    }
}

module.exports = {
    authCredentials,
    DOMAIN,
    mailOptions
}