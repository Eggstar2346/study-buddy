const { google } = require('googleapis')
const web_client = require('../client_id.json')

// Google Calendar Scopes
const scopes = [
    // 'https://www.googleapis.com/auth/blogger',
    'https://www.googleapis.com/auth/calendar'
];

// const {tokens} = await oauth2Client.getToken(code)
// oauth2Client.setCredentials(tokens);

// const profile = google.oauth2({
//     auth: oauth2client, // authorized oauth2 client 
//     version: 'v2'
// });
// profile.userinfo.get((res) => {
//     console.log(res.data) // get primary user information such as name, email, profile picutre
// });

// Connect to OAuth client
function createConnection() {
    return new google.auth.OAuth2(
        web_client.web.client_id,
        web_client.web.client_secret,
        web_client.web.redirect_uris[0]
    );
}

//auth url
function getConnectionUrl(auth) {
    return auth.generateAuthUrl({
        access_type: 'online',
        prompt: 'consent',
        scope: defaultScope
    });
}

// get oauth2 api
function getOAuth2(auth) {
    return google.oauth2({
        auth: auth,
        version: 'v2'
    });
}

// exports
module.exports.urlGoogle = function () {
    const auth = createConnection();
    const url = getConnectionUrl(auth);
    return url;
}

module.exports.getGoogleAccountFromCode = async function (code, cb) {
    const auth = createConnection();
    const { tokens } = await auth.getToken(code);
    auth.setCredentials(tokens);
    const user = await getOAuth2(auth);
    user.userinfo.get((err, res) => {
        if (err) {
            cb(err);
        } else {
            const userProfile = {
                id: res.data.id,
                accessToken: tokens.access_token,
                name: res.data.name,
                displayPicture: res.data.picture,
                email: res.data.email
            }
            cb(null, userProfile);
        }
    })

}