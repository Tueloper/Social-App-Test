const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		fullname: {
			type: String
		},
		email: {
			type: String,
			unique: true
		},
		profilePicture: {
			type: String,
		},
		password: {
			type: String
		},
		username: {
			type: String
		},
		lastLogin: {
			type: Date,
		},
		tokens: [
			{
				token: {
					type: String,
					required: true
				}
			}
		]
	},
	{
		timestamps: true
	}
);

// using virtual to create a relationship between user and owned directories
userSchema.virtual('posts', {
	ref: 'postTable',
	localField: '_id',
	foreignField: 'user_id'
});

userSchema.virtual('comments', {
	ref: 'comment',
	localField: '_id',
	foreignField: 'user_id'
});

userSchema.virtual('likes', {
	ref: 'postLike',
	localField: '_id',
	foreignField: 'user_id'
});

const User = mongoose.model('user', userSchema);
module.exports = User;
