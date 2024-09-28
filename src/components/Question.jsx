import React from 'react';

const Question = ({ question, selectedAnswer, setSelectedAnswer }) => {
  return (
    <div className="question-box">
      <h2>{question.question}</h2>
      <div className="answer-row">
        <div className="answer-left">
          <label className="answer">
            <input
              type="radio"
              name="answer"
              value={question.options[0]}
              checked={selectedAnswer === question.options[0]}
              onChange={() => setSelectedAnswer(question.options[0])}
            />
            A: {question.options[0]}
          </label>
          <label className="answer">
            <input
              type="radio"
              name="answer"
              value={question.options[2]}
              checked={selectedAnswer === question.options[2]}
              onChange={() => setSelectedAnswer(question.options[2])}
            />
            C: {question.options[2]}
          </label>
        </div>
        <div className="answer-right">
          <label className="answer">
            <input
              type="radio"
              name="answer"
              value={question.options[1]}
              checked={selectedAnswer === question.options[1]}
              onChange={() => setSelectedAnswer(question.options[1])}
            />
            B: {question.options[1]}
          </label>
          <label className="answer">
            <input
              type="radio"
              name="answer"
              value={question.options[3]}
              checked={selectedAnswer === question.options[3]}
              onChange={() => setSelectedAnswer(question.options[3])}
            />
            D: {question.options[3]}
          </label>
        </div>
      </div>
    </div>
  );
};

export default Question;
