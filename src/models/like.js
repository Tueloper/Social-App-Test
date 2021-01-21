const mongoose = require('mongoose');

const likeSchema = mongoose.Schema(
	{
		post_id: {
			type: mongoose.Schema.Types.ObjectId,
			trim: true,
			required: true,
			ref: 'orderTable'
		},
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			trim: true,
			required: true,
			ref: 'user'
		},
	},
	{
		timestamps: true
	}
);

const Like = mongoose.model('postLike', likeSchema);
module.exports = Like;
