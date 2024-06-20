// models/TestResult.js
const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
    testId: String,
    userId: String,
    answers: Object,
    score: Number,
  });
  
  module.exports = mongoose.model('TestResult', testResultSchema);