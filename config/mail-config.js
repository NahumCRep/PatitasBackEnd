// MailGun Api
 

// Google Gmail Api
const auth = {
    type: "OAuth2",
    user: "patitaswebinfo@gmail.com",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
};
  
const mailoptions = (email_to, subject) => {
    return {
        from: "patitaswebinfo@gmail.com",
        to: email_to,
        subject: subject,
    }
};
  
module.exports = {
    auth,
    mailoptions,
};