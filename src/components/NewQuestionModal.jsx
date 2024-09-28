import React, { useState } from 'react';
import axios from 'axios';

const NewQuestionModal = ({ closeModal, refreshQuestions }) => {
  const [category, setCategory] = useState('');
  const [question, setQuestion] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleAddQuestion = () => {
    if (!category || !question || !optionA || !optionB || !optionC || !optionD || !correctAnswer) {
      alert('Please fill in all fields');
      return;
    }

    const newQuestion = {
      category,
      question,
      options: [optionA, optionB, optionC, optionD],
      correctAnswer,
    };

    axios.post('http://localhost:1500/questions', newQuestion)
      .then(() => {
        refreshQuestions();
        closeModal();
      })
      .catch(error => console.error('Error adding new question:', error));
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Question</h5>
            <button type="button" className="close" onClick={closeModal}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Option A"
              value={optionA}
              onChange={(e) => setOptionA(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Option B"
              value={optionB}
              onChange={(e) => setOptionB(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Option C"
              value={optionC}
              onChange={(e) => setOptionC(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Option D"
              value={optionD}
              onChange={(e) => setOptionD(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Correct Answer"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handleAddQuestion}>Add Question</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewQuestionModal;
