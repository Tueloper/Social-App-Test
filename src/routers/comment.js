const { Router } = require('express');
const Auth = require('../middleware/Auth');
const {
	addComment,
	deleteComment
} = require('../controllers/comment');

const router = Router();

router.post('/comment/add/:post_id', Auth, addComment);
router.post('/comment/delete/:post_id', Auth, deleteComment);

module.exports = router;
