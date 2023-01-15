const nodemailer = require("nodemailer");
const path = require('path');
const hbs = require('nodemailer-express-handlebars');
const emailConfig = require("../config/mail-config");
const { google } = require("googleapis");

// const img = require('../views/assets/patitasbanner.svg');

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );
  
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const sendMail = async (email) => {
    try {
        const {auth, mailoptions} = emailConfig;
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                ...auth,
                accessToken
            }
        })

        transport.use('compile',  hbs({
            viewEngine: {
                extName: '.handlebars',
                partialsDir: path.join(__dirname, 'views/'),
                layoutsDir: path.join(__dirname, 'views/'),
                defaultLayout: false,
            },
            viewPath:  path.join(process.cwd(), 'views'),
            extName: ".handlebars",
        }))

        const options = {
            ...mailoptions(email, 'Patitas Registro'),
            text: 'Gracias por Registrarse en Patitas Web',
            template: 'registration',
            attachments: [{
                filename: 'patitasbanner.svg',
                path: path.join(process.cwd(), 'views', 'assets', 'patitasbanner.svg'),
                cid: 'banner'
          }],
        }

        const result = await transport.sendMail(options);

        return {
            ok: true,
            message: "email sended correctly"
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: error
        }
    }
}

module.exports = {
    sendMail
}
