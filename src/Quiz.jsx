import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/questions')
      .then(response => {
        setQuestions(shuffleArray(response.data)); 
      })
      .catch(error => console.error('Error fetching the questions: ', error));
  }, []);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === '') {
      alert('Kérjük, válassz egy választ a továbblépéshez!');
      return;
    }

    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex === questions.length - 1) {
      setIsQuizFinished(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setIsQuizFinished(false);
    setQuestions(shuffleArray(questions));
  };

  if (isQuizFinished) {
    return (
      <div>
        <h2>A kvíz véget ért!</h2>
        <p>Elért pontszám: {score} / {questions.length}</p>
        <button onClick={restartQuiz}>Újraindítás</button>
      </div>
    );
  }

  if (questions.length === 0) {
    return <p>Töltés...</p>;
  }

  return (
    <div>
      <h2>Kérdés {currentQuestionIndex + 1} / {questions.length}</h2>
      <p>{questions[currentQuestionIndex].question}</p>
      <div>
        {questions[currentQuestionIndex].answers.map((answer, index) => (
          <div key={index}>
            <label>
              <input 
                type="radio" 
                name="answer" 
                value={answer} 
                checked={selectedAnswer === answer} 
                onChange={() => handleAnswerSelect(answer)} 
              />
              {answer}
            </label>
          </div>
        ))}
      </div>
      <button onClick={handleNextQuestion}>Következő kérdés</button>
    </div>
  );
};

export default Quiz;
