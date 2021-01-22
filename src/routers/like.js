const { Router } = require('express');
const Auth = require('../middleware/Auth');
const {
	addLike,
	deleteLike
} = require('../controllers/like');

const router = Router();

router.post('/like/add/:post_id', Auth, addLike);
router.post('/like/delete/:post_id', Auth, deleteLike);

module.exports = router;
