import { useState } from "react";
import { decode } from "html-entities";

export default function box(props) {
  const [selectedOption, setSelectedOption] = useState(null);
  const options = props.options.map((option, index) => {
    let style = "";
    if (!props.renderAnswer) {
      style = {
        backgroundColor: selectedOption === option ? "#d6dbf5" : "#f5f7fb",
      };
    } else if (props.isCorrect) {
      style = { backgroundColor: "#94D7A2" };
    } else if (option === props.correctAnswer) {
      style = { backgroundColor: "#94D7A2" };
    } else {
      style = {
        backgroundColor: selectedOption === option ? "#F8BCBC" : "#f5f7fb",
      };
    }

    return (
      <button
        className="btn option-btn"
        onClick={() => {
          setSelectedOption(option);
          props.handleClick(option, props.id);
        }}
        key={index}
        style={style}
      >
        {decode(option)}
      </button>
    );
  });

  return (
    <div className="box">
      <div className="question">{props.question}</div>
      <div className="options">{options}</div>
    </div>
  );
}
