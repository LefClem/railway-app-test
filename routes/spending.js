const express = require('express');
const router = express.Router();
const spending = require('../controllers/spending')
const auth = require('../middleware/auth');

router.post('/spending', auth, spending.createSpending);
router.put('/spending/:id', auth, spending.updateSpending);
router.get('/spending/all', auth, spending.getSpendings);
router.get('/spending/:id', auth, spending.getOneSpending);
router.delete('/spending/:id', auth, spending.deleteSpending);

module.exports = router;