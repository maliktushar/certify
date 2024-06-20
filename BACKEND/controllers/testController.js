const fs = require('fs');
const path = require('path');
const Question = require('../models/Question');  // Import the Question model

const getQuestions = async (req, res) => {
  const { testId, testName } = req.body;
  try {
    const questionsFilePath = path.join(__dirname, '../data/questions.json');
    const questionsData = fs.readFileSync(questionsFilePath);
    let tests = JSON.parse(questionsData);

    // Find the test by testId and testName
    const test = tests.find(t => t.testId === testId && t.testName === testName);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    // Randomize the questions and select 20
    const questions = test.quesArray.sort(() => 0.5 - Math.random()).slice(0, 20);
    res.json({ questions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions' });
  }
};

const getQuestionsById = async (req, res) => {
  const { testId } = req.params;
  try {
    const questionsFilePath = path.join(__dirname, '../data/questions.json');
    const questionsData = fs.readFileSync(questionsFilePath);
    let tests = JSON.parse(questionsData);

    // Find the test by testId
    const test = tests.find(t => t.testId === testId);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    // Randomize the questions and select 20
    const questions = test.quesArray.sort(() => 0.5 - Math.random()).slice(0, 20);
    res.json({ questions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions' });
  }
};

const submitAnswers = async (req, res) => {
  const { testId, answers } = req.body;
  try {
    const questionsFilePath = path.join(__dirname, '../data/questions.json');
    const questionsData = fs.readFileSync(questionsFilePath);
    let tests = JSON.parse(questionsData);

    // Find the test by testId
    const test = tests.find(t => t.testId === testId);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    // Evaluate answers
    let score = 0;
    let report = test.quesArray.map(q => {
      const userAnswer = answers[q.question] || null;
      const correct = userAnswer === q.correctOption;
      if (correct) score++;
      return {
        question: q.question,
        correctAnswer: q.correctOption,
        userAnswer,
        correct,
      };
    });

    res.json({ score, report, passed: score >= 15 });
  } catch (error) {
    res.status(500).json({ message: 'Error evaluating test' });
  }
};

module.exports = { getQuestions, getQuestionsById, submitAnswers };
