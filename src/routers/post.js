const { Router } = require('express');
const Auth = require('../middleware/Auth');
const {
	CreatePost,
	getSinglePost,
	getAllPost,
	updatePost,
	deletePost
} = require('../controllers/post');

const router = Router();

router.post('/post/add', Auth, CreatePost);
router.get('/post/', getAllPost);
router.get('/post/:id', getSinglePost);
router.patch('/post/update/:id', Auth, updatePost);
router.post('/post/delete/:id', Auth, deletePost);

module.exports = router;
