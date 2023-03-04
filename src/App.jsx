import { useState } from "react";
import "./App.css";

function App() {
  const [intro, setIntro] = useState(true);
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
        <div className="quiz-page">Quiz</div>
      )}
    </div>
  );
}

export default App;
