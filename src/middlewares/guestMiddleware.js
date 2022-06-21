function guestMiddleware(req, res, next) {
	if (req.session.userLogged == undefined) {
		next();
	}
	return res.redirect('/');
}

module.exports = guestMiddleware;