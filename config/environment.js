
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
            user: "sagarboora.2020@gmail.com", // generated ethereal user
            pass: "sagarbooradevil@1S2020" // generated ethereal password
        }
    },
    google_clientId:"9481299943-no7q28ioc39is3t93l7jjjtapbib33tn.apps.googleusercontent.com",
    google_secret:"7qM0HCcp4x5het6Nf0uMR92t",
    google_callbackURL:"http://localhost:8000/users/auth/google/callback",
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