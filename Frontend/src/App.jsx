import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import ResultPage from './components/ResultPage';
import TestCard from './components/TestCard';
import TestPage from './components/TestPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test/:testId" element={<TestPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
};

const Home = () => (
  <div>
    <h1>Choose a Test</h1>
    <TestCard testId="1" testName="Software Engineer Intern" />
    <TestCard testId="2" testName="SQL Advanced" />
    <TestCard testId="3" testName="Python Developer Intermediate" />
    <TestCard testId="4" testName="React Developer Beginner" />
    <TestCard testId="5" testName="Node.js Developer Intermediate" />
    <TestCard testId="6" testName="Java Developer Intermediate" />
  </div>
);

export default App;
