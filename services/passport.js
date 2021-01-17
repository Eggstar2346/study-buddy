// const passport = require('passport');
// const googleStrategy = require('passport-google-oauth20');
// const web_client = require('../client_id.json')

// passport.serializeUser((user, done) => {
//     const session = {
//         id: user.gooogleID,
//         token: user.accessToken,
//         name: user.name,
//         displayPicture: user.url,
//         email: user.email
//     }
//     done(null, session);
// });


// passport.deserializeUser((sessionUser, done) => {
//     done(null, sessionUser)
// });

// passport.use(
//     new googleStrategy(
//         {
//             clientID: web_client.web.client_id,
//             clientSecret: web_client.web.client_secret,
//             callbackURL: web_client.web.redirect_uris[0]
//         },
//         (accessToken, refreshToken, profile, done) => {
//             const session = {
//                 token: accessToken,
//                 name: profile.displayName,
//                 displayPicture: profile._json.picture,
//                 email: profile._json.email
//             }

//             console.log('passport session:', session)

//             done(null, session);
//         }
//     )
// );

// module.exports = passport;


const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcryptjs');


function SessionConstructor(userId, userType){
	this.id = userId;
}
module.exports = function(passport, pool) {
	passport.use(
        new LocalStrategy(async function (email, password, done) {
			// Match user
            console.log("passport strategy");
            const response = await pool.query(`
                SELECT * FROM student WHERE email = ${email}
            `)
            console.log(response.rows)
            const user = response.rows[0]
            if(!user) {
                return done(null, false, { message: 'Email not registered!'})
            }

            if(user.password === password) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password incorrect' })
            }
		})
	);

	passport.serializeUser(function(user, done) {
		console.log("serializing the user: " + user);

		let sessionInstance = new SessionConstructor(user.id);
		done(null, sessionInstance);
	});

	passport.deserializeUser(async (sessionInstance, done) => {
        console.log("deserialize user for session: ", sessionInstance);
        const response = await pool.query(`
            SELECT * FROM student WHERE id = ${sessionInstance.id}
        `)
        const user = response.rows[0]
        done(err, user)
	});
};