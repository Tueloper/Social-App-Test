const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
	{
		body: {
			type: String,
			trim: true
		},
		views: {
			type: Number,
			trim: true,
      required: false,
      default: 0
		},
		published: {
			type: Boolean,
      required: false,
      default:true
		},
		imageUrl: {
			type: String,
			trim: true,
			required: false,
		},
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			trim: true,
			required: true,
			ref: 'user'
		}
	},
	{
		timestamps: true
	}
);

postSchema.virtual('comments', {
	ref: 'comment',
	localField: '_id',
	foreignField: 'post_id'
});

postSchema.virtual('likes', {
	ref: 'postLike',
	localField: '_id',
	foreignField: 'post_id'
});

const Post = mongoose.model('postTable', postSchema);
module.exports = Post;
