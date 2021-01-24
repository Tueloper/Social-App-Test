const Comment = require('./../models/comment');


module.exports = {
	async addComment(req, res) {
		try {
			const user = req.user;
			const post_id = req.params.post_id;
			let comment = new Comment({
				user_id: user._id,
        post_id,
        message: req.body.message
			});
			comment = await comment.save();
			return res.status(200).send({ message: "Successful", comment });
		} catch (e) {
			res.status(404).send(e.message);
		}
	},

	async deleteComment(req, res) {
		try {
			const user = req.user;
			const post_id = request.params.comment_id;
			await Comment.findByIdAndDelete({ comment_id, user_id: user._id });
			return res.status(200).send({ message: "Removed" });
		} catch (e) {
			res.status(404).send(e.message);
		}
	}
};
