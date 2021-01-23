const jwt = require('jsonwebtoken');
const User = require('./../models/user');

//adding a route middleware
const auth = async (req, res, next) => {
	try {
		// if (!req.headers['cookie']) return res.status(401).send('Access denied. No token provided.');
		const token = 
		req.headers['cookie'].split('=')[1] ||
		req.header('Authorization').replace('Bearer ', '') ||
		req.headers['x-access-token'] ||
		res.headers['x-auth-token'];
		console.log(token);
		if (!token) return res.status(401).send('Access denied. No token provided.');
		const decoded = jwt.verify(token, process.env.SECRET);
		const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
		if (!user) {
			throw new Error("Profile dosen't exist");
		}
		req.user = user;
		next();
	} catch (error) {
		res.status(401).send(error.message);
	}
};

module.exports = auth;
