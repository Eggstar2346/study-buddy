// const { google } = require('googleapis');
// const googleAuth = require('../services/googleAuth');
// const passport = require('passport');
// const googleCalenderService =require('../services/googleCalendarService');

module.exports = async (app, passport, pool) => {

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
    let isLoggedIn = false

    app.post('/login', async (req, res, next) => {

		console.log("Entered login route");
		const { email, password } = req.body;

        const response = await pool.query(`
            SELECT * FROM studybuddy.student WHERE email = '${email}'
        `)
        console.log(response.rows)
        if(response.rows.length <= 0){
            console.log('user does not exist')
            res.send({msg: "you are not registered yet, please sign up", hasAcct: false});
            return
        }else{
            const user = response.rows[0]
            if(user.pwd === password){
                isLoggedIn = true
                res.send({msg: "Welcome Back!", hasAcct: true, pwd: true, user = user});
            }else{
                res.send({msg: "Incorrect Password!", hasAcct: true, pwd: false});
            }
        }
        
        // passport.authenticate('local',{
        //     successRedirect: '/login_success',
        //     failureRedirect: '/login_failure' 
        // })(req, res, next);
		// console.log("hello")
	});

	app.get('/login_success', (req, res) => {
		console.log("login success")
		const response = { loginStatus: true, errorMessage: '' };
		res.redirect('/dashboard');
	});

	app.get('/login_failure', (req, res) => {
		// const response = { registerStatus: false, errorMessage: 'An error occured. Make sure login info is correct.' };
        console.log("hewow")
        res.send({msg: "you are not registered yet, please sign up", hasAcct: false});
        // res.redirect('/register');
	});

	app.get('/users/signedIn', (req, res) => {
		if (req.isAuthenticated()) {
			res.send(true);
		} else {
			res.send(false);
		}
	});

	app.get('/users/:id/current', async (req, res) => {
        const {id} = req.params
        const response = await pool.query(`
            SELECT timetable, course_name FROM studybuddy.course WHERE student_id = '${id}'
        `)
        const courses = response.rows
        if(courses.length <= 0) {
            res.send({isNewUser: true, timetables: []})
        } else {
            res.send({isNewUser: false, timetables: courses})
        }
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
        const {email, password, name} = req.body
        try {
            const response = await pool.query(`
                INSERT INTO studybuddy.student (student_id, email, pwd, student_name, mode) 
                VALUES ('0000000000', '${email}', '${password}', '${name}', NULL)
            `)
            console.log('success!')
            res.send({
                success: true,
                msg: 'created student!'
            })
        }catch(err) {
            res.send({
                success: false,
                msg: err.toString()
            })
        }
    })
}