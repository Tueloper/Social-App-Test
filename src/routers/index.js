const { Router } = require('express');

const welcomeMessage = require('../controllers');

const router = Router();

router.get('/', welcomeMessage);

module.exports = router;