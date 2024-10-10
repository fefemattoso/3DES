const express = require('express');
const router = express.Router();
const { getAutomoveis, createAutomovel } = require('../controllers/automoveisController');

router.get('/', getAutomoveis);
router.post('/', createAutomovel);

module.exports = router;
