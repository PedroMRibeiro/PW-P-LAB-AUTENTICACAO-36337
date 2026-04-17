const express = require('express');
const router = express.Router();
const { signup, signin, profile } = require('../controllers/auth.controller');
const authenticateToken = require('../middleware/auth.middleware');

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', authenticateToken, profile); // rota protegida (desafio)

module.exports = router;