import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TestCard = ({ testId, testName }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/get-questions', { testId, testName });
      // Navigate to TestPage with the questions passed as state
      navigate(`/test/${testId}`, { state: { questions: response.data.questions } });
    } catch (error) {
      console.error('Error fetching questions', error);
    }
  };

  return (
    <div className="test-card" onClick={handleClick} style={{ cursor: 'pointer', padding: '10px', border: '1px solid black', margin: '10px' }}>
      <h3>{testName}</h3>
    </div>
  );
};

export default TestCard;
