// Contains routes needed for auth of user

const { Router } = require('express');
const authController = require('../controllers/authControllers');
const router = Router();
const auth = require('../middleware/auth');

// handles POST request; user provides name, email, pw for registering
router.post('/register', authController.signup);
// handles user login; checks credentials
router.post('/login', authController.login);
// GET request; retrieve if user logged in or not
router.post('/user', auth, authController.get_user);
// logout route handled by Local Storage for storing JWT Token
// Handles on client side

module.exports = router;