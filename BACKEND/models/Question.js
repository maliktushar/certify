// models/Question.js
const mongoose = require('mongoose');
const { text } = require('pdfkit');

const questionSchema = new mongoose.Schema({
  testId: String,
  testName: String,
    quesArray: [{
      question: String,
      options: [String],
      correctAnswer: String,
    }],
    });

module.exports = mongoose.model('Question', questionSchema);
