const { google } = require('googleapis');
const googleAuth = require('../services/googleAuth');
const passport = require('passport');
const googleCalenderService =require('../services/googleCalendarService');

module.exports = async (app, pool) => {

    // app.get('/login', passport.authenticate('google', {
    //     scope: [
    //         'profile',
    //         'email'
    //     ]
    // }));
    
    // app.get('/login/success-again', passport.authenticate('google', {
    //     scope: [
    //         'profile',
    //         'email'
    //     ]
    // }), (req, res) => {
    //     console.log(req.user)
    //     console.log('login successful!')
    //     res.redirect('/dashboard');
    // });
    
    // app.get('/dashboard', (req, res) => {
    //     console.log(req.user)
    //     if (typeof req.user === 'undefined') {
    //         console.log('pls login')
    //         res.redirect('/login')
    //     } else {
    //         console.log('already logged in')
    //         res.render('redirect.html')
    //     }
    // })
    

    // app.get('/login', (req, res) => {
    //     res.redirect(googleAuth.urlGoogle())
    // })

    // const setCookie = (req, res, next) => {
    //     googleAuth.getGoogleAccountFromCode(req.query.code, (err, res) => {
    //         if (err) {
    //             console.log(err)
    //             res.redirect('/login');
    //         } else {
    //             // console.log(res)
    //             req.session.user = res;
    //         }
    //         next();
    //     });
    // }

    // app.get('/login/success', setCookie, (req, res) => {
    //     console.log('login success with cookie')
    //     res.redirect('/login/success-again');
    // })

    // app.get('/redirect', (req, res) => {
    //     console.log('redirecting...')
    //     res.render('redirect.html');
    // });

    // app.get('/dashboard', (req, res) => {
    
    //     // check for valid session
    //     if (req.session.user) {
    
    //         // get oauth2 client
    //         const oauth2Client = new google.auth.OAuth2();
    //         oauth2Client.setCredentials({
    //             access_token: req.session.user.accessToken
    //         });
    
    //         // get calendar events by passing oauth2 client
    //         googleCalenderService.listEvents(oauth2Client, (events) => {  
    //             console.log('reading calendar service', events);
                          
    //             const data = {
    //                 name: req.session.user.name,
    //                 displayPicture: req.session.user.displayPicture,
    //                 id: req.session.user.id,
    //                 email: req.session.user.email,
    //                 events: events
    //             }

    //             console.log('user data:', data)
    //             res.send(data);
    //         });
            
    //     } else {
    //         res.redirect('/login')
    //     }
    // });

    // app.get('/logout', (req, res) => {
    //     req.session.destroy(err => {
    //         if (err) {
    //             res.redirect('/');
    //         }
    //         res.clearCookie('sid');
    //         res.redirect('/');
    //     });
    // })

    app.post('/login', (req, res, next) => {

		console.log("Entered login route");
		const response = { registerStatus: false, errorMessage: '' };
		const { email, password } = req.body;
		console.log(req.body);
		let errors = [];
		//console.log(req.body);

		/* Perform Input Validation*/
		/*Check if Fields Empty */
		if (!email || !password) {
			errors.push('Make sure all fields are completed');
		}

		if (errors.length > 0) {
			response.errorMessage = errors[0];
			console.log(errors);
			res.send(response);
			return;
		}

		console.log("no errors");
		passport.authenticate('local')(req, res, next);
		console.log("hello")
	});

	app.get('/login_success', (req, res) => {
		console.log("login success")
		const response = { loginStatus: true, errorMessage: '' };
		res.redirect('/dashboard');
	});

	app.get('/login_failure', (req, res) => {
		// const response = { registerStatus: false, errorMessage: 'An error occured. Make sure login info is correct.' };
		res.redirect('/register');
	});

	app.get('/users/signedIn', (req, res) => {
		if (req.isAuthenticated()) {
			res.send(true);
		} else {
			res.send(false);
		}
	});

	app.get('/users/current', (req, res) => {
		console.log(req.user);
		res.send(req.user);
	});

	app.get('/logout', (req, res) => {
		console.log('logging out');
		req.logout();
		res.redirect('/login');
	});

	app.post('/users/register', async (req, res) => {
		// const response = { registerStatus: false, errorMessage: '' };
		// const studentData = req.body;
		// let errors = [];
        console.log('register user');
        // create new student
        const {id, email, pwd, student_name} = req.body
        const response = await pool.query(`
            INSERT INTO student (id, email, pwd, student_name, mode) 
            VALUES (${id}, ${email}, ${pwd}, ${student_name}, NULL)
        `)
        console.log(response)
        if(response) {
            res.send('created student!')
        }
    })
}