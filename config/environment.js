
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

// const production = {
//     name="production"
// }

module.exports = development;