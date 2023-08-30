import { decode } from "html-entities";
import { useState, useEffect } from "react";
import "./App.css";
import Box from "./box";

function App() {
  const [intro, setIntro] = useState(true);
  const [quizData, setQuizData] = useState([]);
  const [score, setScore] = useState(0);
  const [renderAnswer, setRenderAnswer] = useState(false);
  const [newGame, setNewGame] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // https://opentdb.com/api.php?amount=5
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`This is an HTTP error: The status is ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setError(null);
        return processData(data.results);
      })
      .then((data) => setQuizData(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [newGame]);

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  function processData(data) {
    let arr = [];
    for (let i = 0; i < 5; i++) {
      let optionsArr = [data[i].correct_answer, ...data[i].incorrect_answers];
      shuffle(optionsArr);
      arr.push({
        ...data[i],
        id: i,
        correct: false,
        renderAnswer: renderAnswer,
        isClicked: false,
        options: optionsArr,
      });
    }
    return arr;
  }

  function checkSelectedOptions(option, id) {
    setQuizData((prev) =>
      prev.map((i) => {
        if (i.id !== id) return i;
        else if (i.correct_answer !== option) return { ...i, isClicked: true };
        else return { ...i, correct: true, isClicked: true };
      })
    );
  }

  function recordScore() {
    for (let i of quizData) {
      if (i.correct) setScore((prevScore) => (prevScore += 1));
    }
  }

  function isRenderAnswer() {
    recordScore();
    quizData.every((i) => i.isClicked) && setRenderAnswer((prev) => !prev);
  }

  function anotherGame() {
    setNewGame((prev) => !prev);
    setRenderAnswer((prev) => !prev);
    setScore(0);
    setLoading(true);
  }

  const questions = quizData.map((i) => {
    return (
      <Box
        question={decode(i.question)}
        options={i.options}
        difficulty={i.difficulty}
        handleClick={checkSelectedOptions}
        correctAnswer={i.correct_answer}
        correct={i.correct}
        renderAnswer={renderAnswer}
        id={i.id}
        key={i.id}
      />
    );
  });

  if (loading)
    return (
      <div className="app loading">
        <h1> Loading... </h1>
      </div>
    );

  if (error)
    return (
      <div className="app error">
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      </div>
    );

  return (
    <div className="app">
      {intro ? (
        <div className="intro-page">
          <h3 className="title">Quizzical</h3>
          <p className="info">Fun quiz</p>
          <button className="start-btn" onClick={() => setIntro(false)}>
            Start Quiz
          </button>
        </div>
      ) : (
        <div className="quiz-page">
          <pre className="questions">{questions}</pre>
          {renderAnswer ? (
            <div className="results">
              <p className="score">{`You scored ${score}/5 correct answers`}</p>
              <button className="btn new-btn" onClick={anotherGame}>
                New Game
              </button>
            </div>
          ) : (
            <button className="btn check-btn" onClick={isRenderAnswer}>
              Check Answers
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
