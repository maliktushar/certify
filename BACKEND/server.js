// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const { getQuestions, submitAnswers, getQuestionsById } = require('./controllers/testController');
const { generateCertificate } = require('./controllers/certificateController');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/certificates', express.static(path.join(__dirname, 'certificates')));

mongoose.connect('mongodb://127.0.0.1:27017/test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

app.post('/api/get-questions', getQuestions);
app.get('/api/test-questions/:testId', getQuestionsById);
app.post('/api/submit-answers', submitAnswers);
app.post('/api/generate-certificate', generateCertificate);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
