const express = require('express');
const router = express.Router();
const user = require('../controllers/auth');


router.post('/signup', user.signup);
router.post('/login', user.login);
