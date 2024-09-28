import React from 'react';

const Results = ({ score, total, restartQuiz }) => {
  const percentage = (score / total) * 100;

  let message = '';
  if (percentage >= 80) {
    message = 'Congratulations! (God)';
  } else if (percentage >= 50) {
    message = 'Not bad! (Kid)';
  } else {
    message = 'You can do better! (Redneck)';
  }

  return (
    <div className="text-center my-5">
      <h2>{message}</h2>
      <p>Your final score: {percentage.toFixed(2)}%</p>
      <button onClick={restartQuiz} className="btn btn-primary">Restart Quiz</button>
    </div>
  );
};

export default Results;
