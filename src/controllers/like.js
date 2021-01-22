const Like = require('./../models/like');


module.exports = {
	async addLike(req, res) {
		try {
			const user = req.user;
			const post_id = request.params.post_id;
			let like = new Like({
				user_id: user._id,
				post_id
			});
			like = await like.save();
			return res.status(200).send({ message: "Liked", like });
		} catch (e) {
			res.status(404).send(e.message);
		}
	},

	async deleteLike(req, res) {
		try {
			const user = req.user;
			const post_id = request.params.post_id;
			await Like.findByIdAndDelete({ post_id, user_id: user._id });
			return res.status(200).send({ message: "Removed" });
		} catch (e) {
			res.status(404).send(e.message);
		}
	}
};
