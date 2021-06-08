const express = require('express');
const router = express.Router();

const q1 = require('../services/questOne.service');
const q2 = require('../services/questTwo.service');

router.get('/question_one', q1.answer);
router.get('/question_two', q2.answer);

module.exports = router;