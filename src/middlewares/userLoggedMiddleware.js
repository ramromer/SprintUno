const User = require('../models/User');

function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;
    let userCookie = req.cookies.user;


    if(userCookie){
        req.session.userLogged = User.findByField('email', userCookie);
    }

	if ( req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
	}
    
    next();
}

module.exports = userLoggedMiddleware;