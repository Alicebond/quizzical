import { useState, useEffect } from "react";
import "./App.css";
import Box from "./box";

function App() {
  const [intro, setIntro] = useState(true);
  const [quizData, setQuizData] = useState([]);
  const [score, setScore] = useState(0);
  const [renderAnswer, setRenderAnswer] = useState(false);
  const [newGame, setNewGame] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => processData(data.results))
      .then((data) => setQuizData(data));
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
      prev.map((i) =>
        i.id === id
          ? i.correct_answer === option
            ? { ...i, correct: true, isClicked: true }
            : { ...i, isClicked: true }
          : i
      )
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
  }

  const questions = quizData.map((i) => {
    return (
      <Box
        question={i.question}
        options={i.options}
        difficulty={i.difficulty}
        handleClick={checkSelectedOptions}
        correctAnswer={i.correct_answer}
        correct={i.correct}
        renderAnswer={renderAnswer}
        id={i.id}
      />
    );
  });

  return (
    <div className="App">
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
