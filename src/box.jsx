import { useState } from "react";
import { decode } from "html-entities";

export default function box(props) {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = props.options.map((option, index) => (
    <button
      className="btn option-btn"
      onClick={() => {
        setSelectedOption(option);
        props.handleClick(option, props.id);
      }}
      key={index}
      style={
        props.renderAnswer
          ? props.isCorrect
            ? { backgroundColor: "#94D7A2" }
            : option === props.correctAnswer
            ? { backgroundColor: "#94D7A2" }
            : {
                backgroundColor:
                  selectedOption === option ? "#F8BCBC" : "#f5f7fb",
              }
          : {
              backgroundColor:
                selectedOption === option ? "#d6dbf5" : "#f5f7fb",
            }
      }
    >
      {decode(option)}
    </button>
  ));

  return (
    <div className="box">
      <div className="question">{props.question}</div>
      <div className="options">{options}</div>
    </div>
  );
}
