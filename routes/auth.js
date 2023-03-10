const express = require('express');
const router = express.router();
const user = require('../controllers/auth');


router.post('/signup', user);
router.post('/login', user);
