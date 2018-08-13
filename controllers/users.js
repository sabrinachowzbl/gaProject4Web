const sha256 = require('js-sha256');
const SALT = 'yay!';

module.exports = function (db) {
	const get = (request, response) => {
        response.render('hello');
    }

    const login = (request, response) => {
        response.render('loginForm');
    }

    const loginCheck = (request, response) => {
        let passwordHash = sha256(request.body.password);

        db.user.getUsersFromEmail(request.body.email, passwordHash, (err, queryResult)  => {
            if (err) {
                response.send('db error: '+ err.message);
            } else { 
                if (queryResult.rows.length === 0) {
                    response.render('loginForm', {message: 'your email/ password is wrong'});
                } else if (queryResult.rows[0].password_hash == passwordHash) {
                    let user_id = queryResult.rows[0].id;
                    let currentSessionCookie = sha256(user_id + 'logged_id' + SALT);

                    response.cookie('session', currentSessionCookie);
                    response.cookie('loggedin', 'true');
                    response.cookie('user_id', user_id);
                    response.cookie('username', queryResult.rows[0].username);
                    let context = {username: queryResult.rows[0].username};

                    // response.send('logged user in with id: ' + user_id);
                    response.redirect('/game');
                } else {
                    response.render('loginForm', {message: 'your email/ password is wrong'});
                }
            }
        });
    }

    const signup = (request, response) => {
        response.render('signupForm');
    }

    const createUser = (request, response) => {
        let password_hash = sha256(request.body.password);

        db.user.userCreate(request.body.username, request.body.email, password_hash, (boolIsFine, msg) => {
            if(boolIsFine) {
                response.render('loginForm', {message: 'sign up successful!'});
            } else {
                response.render('signupForm', {message: msg})
            }
        });
    }

    const userDashboard = (request, response) => {
        let user_id = request.cookies.user_id;

        db.user.getUsersFromId(user_id, (err, queryResult) => {
            response.render('game', {username: queryResult.rows[0].username, id: queryResult.rows[0].id});
        })
    }

    return {
        get: get,
        login: login,
        loginCheck: loginCheck,
        signup: signup,
        createUser: createUser,
        userDashboard: userDashboard
    }
}