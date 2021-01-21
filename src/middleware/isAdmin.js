function isAdmin(req, res, next) {
	const { role } = req.user;
	// return console.log(role);
	if (role != 'admin') return res.status(409).send({ message: 'You are not authorized' });
	else next();
}

function isUser(req, res, next) {
	const { role } = req.user;
	// return console.log(role);
	if (role != 'user') return res.status(409).send({ message: 'You are not authorized' });
	else next();
}

module.exports = { isAdmin, isUser };
