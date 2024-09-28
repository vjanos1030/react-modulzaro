import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from './Question';
import ProgressBar from './ProgressBar';
import Results from './Results';
import NewQuestionModal from './NewQuestionModal';

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchQuestions = () => {
    axios.get('http://localhost:1500/questions')
      .then(response => {
        const shuffledQuestions = response.data.map(question => {
          const shuffledOptions = shuffleArray([...question.options]);
          const correctIndex = shuffledOptions.indexOf(question.correctAnswer);

          return {
            ...question,
            options: shuffledOptions,
            correctAnswer: shuffledOptions[correctIndex],
          };
        });

        setQuestions(shuffledQuestions);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleNextQuestion = () => {
    if (selectedAnswer === '') {
      alert('Please select an answer!');
      return;
    }

    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
    setSelectedAnswer('');
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">My Quiz App</h1>
      {quizFinished ? (
        <Results score={score} total={questions.length} restartQuiz={restartQuiz} />
      ) : (
        questions.length > 0 && (
          <>
            <h4>Question Category: {questions[currentQuestionIndex].category}</h4>
            <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
            <Question
              question={questions[currentQuestionIndex]}
              selectedAnswer={selectedAnswer}
              setSelectedAnswer={setSelectedAnswer}
            />
            <div className="d-flex justify-content-between mt-4">
              <button onClick={handleNextQuestion} className="btn btn-primary">Next Question</button>
              <button onClick={() => setShowModal(true)} className="btn btn-success">Add New Question</button>
            </div>
          </>
        )
      )}
      {showModal && <NewQuestionModal closeModal={() => setShowModal(false)} refreshQuestions={fetchQuestions} />}
    </div>
  );
};

export default App;
