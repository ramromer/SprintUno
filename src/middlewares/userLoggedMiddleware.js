function userLoggedMiddleware(req, res, next) {
	if (req.session.userLogged == undefined) {
        res.locals.isLogged = false;
        next();
	}
    else{
        res.locals.isLogged = true;
        next();
    }
}

module.exports = userLoggedMiddleware;