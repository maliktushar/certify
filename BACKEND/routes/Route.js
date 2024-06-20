const express = require('express');
const router = express.Router();
const { getQuestions, submitAnswers, getQuestionsById } = require('../controllers/testController');
const { generateCertificate } = require('../controllers/certificateController');

router.post('/api/get-questions', getQuestions);
router.post('/api/submit-answers', submitAnswers);
router.post('/api/generate-certificate', generateCertificate);
router.get('/api/test-questions/:testId', getQuestionsById);

module.exports = router;