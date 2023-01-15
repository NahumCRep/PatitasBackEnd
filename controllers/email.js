const nodemailer = require("nodemailer");
const emailConfig = require("../config/mail-config");
const { google } = require("googleapis");

const sendMail = (email) => {
    const {auth, mailoptions} = emailConfig;
    console.log(auth);
    console.log(mailoptions(email, 'Saludar'));
}

module.exports = {
    sendMail
}
// const sendMail = async (req, res) => {
//     try {
//         const accessToken = await oAuth2Client.getAccessToken();
//         const transport = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 ...CONSTANTS.auth,
//                 accessToken: accessToken,
//             },
//         });

//         const mailOptions = {
//             ...CONSTANTS.mailoptions,
//             text: "The Gmail API with NodeJS works",
//         };

//         const result = await transport.sendMail(mailOptions);
//         res.send(result);
//     } catch (error) {
//         console.log(error);
//         res.send(error);
//     }
// }