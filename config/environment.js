
const development = {
    name:"development",
    src_path:"./assets/scss",
    dest_path:"./assets/css",
    static_path:"./assets",
    db:"sociel_development",
    smtp:{
        service:"gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.CODEIAL_GMAIL_USER, // generated ethereal user
            pass: process.env.CODEIAL_GMAIL_PASSWORD // generated ethereal password
        }
    },
    google_clientId:process.env.CODEIAL_GMAIL_CLIENT_ID,
    google_secret:process.env.CODEIAL_GOOGLE_SECRET,
    google_callbackURL:process.env.CODEIAL_GOOGLE_CALLBACKURL,
    secretOrKey:"sociel",
    user_api:"sociel"
}

const production = {
    name:"production",
    src_path:process.env.CODEIAL_SRC_PATH,
    dest_path:process.env.CODEIAL_DEST_PATH,
    static_path:process.env.CODEIAL_STATIC_PATH,
    db:process.env.CODEIAL_DB,
    smtp:{
        service:"gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.CODEIAL_GMAIL_USER, // generated ethereal user
            pass: process.env.CODEIAL_GMAIL_PASSWORD // generated ethereal password
        }
    },
    google_clientId:process.env.CODEIAL_GMAIL_CLIENT_ID,
    google_secret:process.env.CODEIAL_GOOGLE_SECRET,
    google_callbackURL:process.env.CODEIAL_GOOGLE_CALLBACKURL,
    secretOrKey:process.env.CODEIAL_SECRET_OR_KEY,
    user_api:process.env.CODEIAL_USER_API
}

module.exports = development;