const Post = require('../models/post');


module.exports = {
	//simple testing router
	async CreatePOst(request, response) {
		try{
			const user = request.user;
			let post = new Post({
				...request.body,
				user_id: user._id,
				views: 0,
				publishedBy: user.fullname
			});
			post = await post.save();
			response.status(201).send({ message:"Post added successfully", post });
		} catch (err) {
			response.status(400).send(err);
		}
	},

	async updatePost(request, response) {
		//setting up validation for the keys to be updated
		const updates = Object.keys(request.body);
		const allowablePost = [
			'imageUrl',
			'body'
		];
		const isValidOrder = updates.every((update) => allowablePost.includes(update));

		//Prompt invalid order inputs
		if (!isValidOrder) {
			return response.status(404).send(' Error: Invalid Order Input ');
		}

		const _id = request.params.id;

		//Send valid data for update
		try {
			const user = request.user;
			const updatedPost = await Post.findOne({ _id, user_id: user._id });
			if (!updatedPost) {
				return response.status(404).send('Order not Found');
			}
			updates.forEach((update) => (updatedPost[update] = request.body[update]));
			await updatedPost.save();
			return response.status(200).send({
				Message: 'Update Successful',
				updatedPost
			});
		} catch (e) {
			console.log(e);
		}
	},

	async getAllPost(request, response) {
		try {
			const posts = await Post.find({});
			response.status(200).json({ message: 'Success', posts });
		} catch (error) {
			throw response.status(500).send(err.message);
		}
	},

	async getUserOrders(request, response) {
		// const match = {};
		// const sort = {};

		// if (request.query.completed) {
		// 	match.completed = request.query.completed === 'true';
		// }

		// if (request.query.sortBy) {
		// 	//accessing the string query to make your sorting process
		// 	const pathSort = request.query.sortBy.split(':');
		// 	sort[pathSort[0]] = pathSort[1] === 'desc' ? -1 : 1;
		// }

		try {
			const user = request.user;
			// return console.log(user.id);
			// const tasks = await Order.find({ ownerId: userProfile._id })
			// await user
			// 	.populate({
			// 		path: 'orders',
			// 		match
			// 	})
			// 	.execPopulate();

			// response.send(user.orders);

			const orders = await Order.find({ ownerId: user._id }).cache({ key: user._id });
			// console.log('Serving from mongodb')
			response.send(orders);
		} catch (e) {
			response.status(400).send(e);
		}
	},

	async deletePost(request, response) {
		const _id = request.params.id;

		try {
			const user = request.user;
			const deletedPost = await Post.findByIdAndDelete({ _id, user_id: user._id });

			if (!deletedPost) {
				return response.status(404).send({ message: 'Post does not exist' });
			}

			response.send({ message: "Post deleted Successfully", deletedPost });
		} catch (e) {
			response.status(500).send(e);
		}
	},

	//This is used to read Order by id
	async getSinglePost(request, response) {
		try {
			const user = request.user;
			const _id = request.params.id;
			const post = await Post.findOne({ _id });
			if (!post) {
				return response.status(404).send('Error: Post Not Found');
			}
			post.views = Number(post.views) + 1;
			await post.save();
			response.status(200).send({
				Message: 'Post is Gotten successfully',
				post
			});
		} catch (e) {
			response.status(500).send(e);
		}
	},
}