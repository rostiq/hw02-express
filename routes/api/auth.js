const { Router } = require('express');

const {checkSignupUserData, protect } = require('../../middleware/authMiddleware');
const { signup } = require('../../controllers/auth/signup');
const { login } = require('../../controllers/auth/login');

const { current } = require('../../controllers/auth/current');
const { logout } = require('../../controllers/auth/logout');

const router = Router();

router.post('/signup', checkSignupUserData, signup);
router.post('/login', login);
router.post('/logout', protect, logout );
router.post('/current', protect, current );

module.exports = router;