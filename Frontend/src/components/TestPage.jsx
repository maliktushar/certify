import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const TestPage = () => {
  const { testId } = useParams();
  const location = useLocation();
  const [questions, setQuestions] = useState(location.state?.questions || []);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(1140); // 19 minutes in seconds
  const [score, setScore] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!questions.length) {
      const fetchQuestions = async () => {
        const response = await axios.get(`http://localhost:5000/api/test-questions/${testId}`);
        setQuestions(response.data.questions);
      };
      fetchQuestions();
    }

    // Timer countdown
    const intervalId = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [testId, questions.length]);

  const handleAnswerChange = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers({
      ...answers,
      [currentQuestion.question]: answer,
    });
  };

  const handleClearSelection = () => {
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers({
      ...answers,
      [currentQuestion.question]: null,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit(); // Automatically submit at the end
    }
  };

  const handleSkipQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit(); // Automatically submit at the end
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/submit-answers`, { testId, answers });
      setScore(response.data.score);
      navigate('/result', { state: { score: response.data.score, report: response.data.report, passed: response.data.passed } });
    } catch (error) {
      console.error('Error submitting answers', error);
    }
  };

  if (timer <= 0) {
    handleSubmit();
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      {score !== null ? (
        <ResultPage score={score} />
      ) : (
        <div>
          <h2>Test {testId}</h2>
          <div>Time Remaining: {Math.floor(timer / 60)}:{timer % 60}</div>
          {currentQuestion && (
            <div>
              <h4>{currentQuestion.question}</h4>
              {currentQuestion.options.map(option => (
                <label key={option}>
                  <input
                    type="radio"
                    name={currentQuestion.question}
                    value={option}
                    checked={answers[currentQuestion.question] === option}
                    onChange={() => handleAnswerChange(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
          <div>
            <button onClick={handleClearSelection}>Clear Selection</button>
            <button onClick={handleSkipQuestion}>Skip</button>
            <button onClick={handleNextQuestion}>Next</button>
          </div>
          <div>
            {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestPage;
