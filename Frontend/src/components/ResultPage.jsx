import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Registering the components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const ResultPage = () => {
  const { state } = useLocation();
  const { score, report, passed } = state || { score: 0, report: [], passed: false };
  const correct = report.filter(r => r.correct).length;
  const incorrect = report.length - correct;

  const data = {
    labels: ['Correct', 'Incorrect'],
    datasets: [
      {
        label: 'Questions',
        data: [correct, incorrect],
        backgroundColor: ['#4caf50', '#f44336'],
      },
    ],
  };

  const downloadCertificate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/generate-certificate', { userId: 'testUser', score });
      const link = document.createElement('a');
      link.href = response.data.certificateUrl;
      link.setAttribute('download', 'Certificate.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading certificate', error);
    }
  };

  return (
    <div>
      <h2>Your Score: {score}</h2>
      <Bar data={data} />
      {passed ? (
        <div>
          <p>Congratulations! You have passed the test.</p>
          <button onClick={downloadCertificate}>Download Certificate</button>
        </div>
      ) : (
        <p>You did not pass. Better luck next time!</p>
      )}
    </div>
  );
};

export default ResultPage;
