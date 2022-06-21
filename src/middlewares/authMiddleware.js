function authMiddleware(req, res, next) {
	if (req.session.userLogged  == undefined) {
		return res.redirect('/users/login');
		// res.redirect("accesDenied")
	}
	next();
}

module.exports = authMiddleware;