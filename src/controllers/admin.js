const User = require('../models/user');
const generateAuthToken = require('../utils/generateToken');
const { hash, compareHash } = require('../utils/hash');

module.exports = {
	async CreateAdmin(request, response) {
		const { password, passwordConfirm, username, email } = request.body;

		try {
			const adminCheck = await User.findOne({ email });
			if (adminCheck) {
				throw new Error("message: 'This email is already taken'");
			}

			// if (password != passwordConfirm) {
			// 	return response.status(402).send({ message: 'Password is not correctly alligned' });
			// }
			const admin = new User({
				username: username,
				email: email,
				password: password
			});
			const token = await generateAuthToken(admin);
			await hash(admin);

			await admin.save();
			response.header('x-auth-token', token).status(201).send({ message: 'Success', admin });
		} catch (e) {
			response.status(500).send(e.message);
		}
	},

	async loginAdmin(request, response) {
		try {
			const { email, password } = request.body;

			const admin = await User.findOne({ email });

			if (!admin) {
				throw new Error('You are not Authorised');
			}

			const passwordMatch = await compareHash(password, admin.password);
			// return console.log(passwordMatch)

			if (!passwordMatch) {
				throw new Error('Invalid Password');
			}
			const token = await generateAuthToken(admin);

			response.header('x-auth-token', token).status(201).send({ message: 'Success', token });
		} catch (e) {
			response.status(500).send(e.message);
		}
	},

	async getAdmin(request, response) {
		response.send(request.user);
	},

	async getAllUsers(request, response) {
		try {
			const users = await User.find({}).cache({ key: request.user._id });
			// return console.log(users);
			let userRole = [];

			users.forEach((user) => {
				if (user.role === 'user') {
					// return console.log(user);
					userRole.push(user);
				}
			});
			response.status(200).send({ message: 'Success', userRole });
		} catch (err) {
			response.status(500).send(err.message);
		}
	},

	async adminLogout(request, response) {
		// return console.log(userProfile)
		try {
			const adminProfile = request.user;
			adminProfile.tokens = [];
			await adminProfile.save();
			return response.status(200).send({});
		} catch (e) {
			response.status(400).send(e.message);
		}
	}
};
