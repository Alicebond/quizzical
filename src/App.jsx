import { useState, useEffect } from "react";
import "./App.css";
import Box from "./box";

function App() {
  const [intro, setIntro] = useState(true);
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => processData(data.results))
      .then((data) => setQuizData(data));
  }, []);

  function processData(data) {
    let arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push({
        ...data[i],
        id: i,
        correct: false,
        renderAnswer: false,
        isClicked: false,
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
          : { ...i, isClicked: true }
      )
    );
  }

  function renderAnswer() {
    quizData.every((i) => i.isClicked) &&
      setQuizData((prev) => prev.map((i) => ({ ...i, renderAnswer: true })));
  }

  const questions = quizData.map((i) => (
    <Box
      question={i.question}
      options={[i.correct_answer, ...i.incorrect_answers]}
      difficulty={i.difficulty}
      handleClick={checkSelectedOptions}
      correctAnswer={i.correct_answer}
      correct={i.correct}
      renderAnswer={i.renderAnswer}
      id={i.id}
    />
  ));

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
