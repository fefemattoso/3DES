const express = require('express');
const router = express.Router();
const { getConcessionarias } = require('../controllers/concessionariasController');

router.get('/', getConcessionarias);

module.exports = router;
