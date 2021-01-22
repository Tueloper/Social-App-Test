const User = require('./../models/user');
const generateAuthToken = require('./../utils/generateToken');
const { hash, compareHash } = require('./../utils/hash');
const { successResponse, errorResponse } = require('./../utils/toolbox');
const { cloudinaryImage, destroyCloudinaryImage } = require('./../services/Cloudinary');

module.exports = {
	async CreateUser(request, response) {
		const { password, fullname, email, username } = request.body;
		try {
			let userCheck = await User.findOne({ email });
			if (!userCheck) userCheck = await User.findOne({ username });
			if (userCheck) {
        return response.status(400).json({ message: 'Email/Username already in use' });
			}
			const user = new User({
				fullname,
				email,
				password,
				username
			});
			const token = await generateAuthToken(user);
			await hash(user);
			await user.save();
			response.cookie('token', token, { maxAge: 70000000, httpOnly: true });
			return response.header('x-auth-token', token).status(201).json({ message: 'Success', user });
		} catch (e) {
      return response.status(500).json({ message: e.message });
		}
	},

	async loginUser(request, response) {
		try {
      // console.log(request.body);
      // return request.body;
			const { email, password } = request.body;
			const user = await User.findOne({ email });
			if (!user) {
				return response.status(401).json({ message: 'Invalid email/password!' });
			}
			const passwordMatch = await compareHash(password, user.password);
			if (!passwordMatch) {
				return response.status(401).json({ message: 'Invalid email/password!' });
			}
			user.lastLogin = Date.now();
			await user.save();
			const token = await generateAuthToken(user);
			response.cookie('token', token, { maxAge: 70000000, httpOnly: true });
			return response.header('x-auth-token', token).status(201).json({ token });
		} catch (e) {
			return response.status(500).json({ message: e.message });
		}
	},

	async getUser(request, response) {
		response.json(request.user);
	},

	async userLogout(request, response) {
		try {
			const userProfile = request.user;
			userProfile.tokens = [];
			await userProfile.save();
			response.cookie('token', '', { maxAge: 0, httpOnly: true });
			return response.status(200).send({ message: 'successful'});
		} catch (e) {
			return response.status(500).json({ message: e.message});
		}
	},

	async updateProfilePic (request, response) {
		try{
			const user = request.user;
			user.profilePicture = request.body.profilePicture
			await user.save();
			return response.status(200).json({ message: 'Profile picture added successfully', user });
		} catch (e) {
			return response.status(500).json({ message: e.message});
		}
	},


	async uploadImage(request, response) {
		try {
			const updatedUser = request.user;
			// return console.log(updatedUser);
			if (!updatedUser) {
				return response.status(404).send('User Not Found');
			} else if (updatedUser.image_url) {
				// return console.log(true);
				const imageUrl = await destroyCloudinaryImage(request.file, updatedUser.image_public_id);

				updatedUser.image_url = imageUrl.secure_url;
				updatedUser.image_public_id = imageUrl.public_id;

				await updatedUser.save();
				return response.status(201).send({ updatedUser });
			} else {
				const imageUrl = await cloudinaryImage(request.file);

				updatedUser.image_url = imageUrl.secure_url;
				updatedUser.image_public_id = imageUrl.public_id;

				await updatedUser.save();
				return response.status(201).send({ updatedUser });
			}
		} catch (err) {
			return response.status(500).json({ message: err.message });
		}
	},

	async updatedUser(request, response) {
		//setting up validation for the keys to be updated
		const updates = Object.keys(request.body);
		const allowable = [ 'fullname', 'phone', 'address', 'email' ];
		const isValid = updates.every((update) => allowable.includes(update));

		//Prompt invalid order inputs
		if (!isValid) {
			return response.status(404).json({ message: 'Invalid inputs' });
		}
		//Send valid data for update
		try {
			const updatedUser = request.user;
			if (!updatedUser) {
				return response.status(400).json({ message: 'User not found!' });
			}

			updates.forEach((update) => (updatedUser[update] = request.body[update]));

			await updatedUser.save();

			return response.status(201).send({
				'message': 'Update Successful',
				updatedUser
			});
		} catch (e) {
			return response.status(500).json({ message: e.message });
		}
	}
};
