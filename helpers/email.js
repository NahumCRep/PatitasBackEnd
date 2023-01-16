const nodemailer = require("nodemailer");
const mailgun = require('nodemailer-mailgun-transport');
const emailConfig = require("../config/mail-config");
const hbs = require('nodemailer-express-handlebars');
const path = require('path');


const sendEmail = (name, email) => {
    try {
        const { auth, mailoptions } = emailConfig;
        const mailgunTransport = nodemailer.createTransport(mailgun(auth));

        // mailgunTransport.use('compile',  hbs({
        //     viewEngine: {
        //         extName: '.handlebars',
        //         partialsDir: path.join(__dirname, 'views/'),
        //         layoutsDir: path.join(__dirname, 'views/'),
        //         defaultLayout: false,
        //     },
        //     viewPath:  path.join(process.cwd(), 'views'),
        //     extName: ".handlebars",
        // }))
        console.log(auth);
        const emailOptions = {
            ...mailoptions(email, 'Patitas Registro'),
            text: 'Gracias por Registrarse en Patitas Web',
            html: '<h1>Gola</h1>'
            // template: 'registration',
            // context: {
            //     name
            // }
        }

        mailgunTransport.sendMail({
           ...emailOptions
        }, (err, info) => {
            if (err) {
                console.log(`Error: ${err}`);
            }
            else {
                console.log(`Response: ${info}`);
            }
        });

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: error
        }
    }
}

module.exports = {
    sendEmail
}