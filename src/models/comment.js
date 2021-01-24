const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
	{
		message: {
			type: String,
			trim: true
		},
		likes: {
			type: Number,
			trim: false
		},
		post_id: {
			type: mongoose.Schema.Types.ObjectId,
			trim: true,
			required: true,
			ref: 'postTable'
		},
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			trim: true,
			required: true,
			ref: 'user'
		},
		comment_id: {
			type: mongoose.Schema.Types.ObjectId,
			trim: true,
			required: false,
			ref: 'comment'
		}
	},
	{
		timestamps: true
	}
);

const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment;
