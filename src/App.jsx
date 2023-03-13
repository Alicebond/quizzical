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
      arr.push({ ...data[i], id: i, isClicked: false });
    }
    return arr;
  }

  function checkAnswer(answer, id) {
    // console.log(answer, id);
    setQuizData((prev) => prev.map());
  }

  const questions = quizData.map((i) => (
    <Box
      question={i.question}
      options={[i.correct_answer, ...i.incorrect_answers]}
      difficulty={i.difficulty}
      handleClick={checkAnswer}
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
          <button className="btn check-btn">Check Answers</button>
        </div>
      )}
    </div>
  );
}

export default App;
