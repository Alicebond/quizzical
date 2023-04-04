import { useState, useEffect } from "react";
import "./App.css";
import Box from "./box";

function App() {
  const [intro, setIntro] = useState(true);
  const [quizData, setQuizData] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => processData(data.results))
      .then((data) => setQuizData(data));
  }, []);

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
        renderAnswer: false,
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
          ? i.answer === option
            ? { ...i, correct: true, isClicked: true }
            : { ...i, isClicked: true }
          : i
      )
    );
    recordScore(option, id);
  }

  function recordScore(option, id) {
    for (let i of quizData) {
      if (i.id === id && i.answer === option) setScore((prev) => prev++);
    }
  }

  function renderAnswer() {
    quizData.every((i) => i.isClicked) &&
      setQuizData((prev) => prev.map((i) => ({ ...i, renderAnswer: true })));
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
        renderAnswer={i.renderAnswer}
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
          <button className="btn check-btn" onClick={renderAnswer}>
            Check Answers
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
