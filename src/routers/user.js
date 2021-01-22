const { Router } = require('express');
const Auth = require('./../middleware/Auth');
const { CreateUser, loginUser, userLogout, getUser, updateProfilePic, updatedUser, uploadImage } = require('../controllers/user');
const upload = require('./../services/upload');
const { isUser } = require('./../middleware/isAdmin');

const router = Router();

router.post('/auth/signup', CreateUser);
router.post('/auth/signin', loginUser);
router.patch('/auth/pic', Auth, updateProfilePic);
router.patch('/auth/user/avatar', [ upload.single('avatar'), Auth, isUser ], uploadImage);
router.get('/auth/me', Auth, getUser);
router.patch('/auth/update/user', [ Auth, isUser ], updatedUser);
router.post('/auth/logout',Auth, userLogout);

module.exports = router;
