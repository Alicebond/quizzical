import { useState } from "react";

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
      style={{
        backgroundColor: selectedOption === option ? "#d6dbf5" : "#f5f7fb",
      }}
    >
      {option}
    </button>
  ));
  return (
    <div className="box">
      <div className="question">{props.question}</div>
      <div className="options">{options}</div>
    </div>
  );
}
