export default function box(props) {
  const styles = { backgroundColor: props.isClicked ? "#d6dbf5" : "#f5f7fb" };
  const options = props.options.map((option, index) => (
    <button
      className="btn option-btn"
      onClick={() => props.handleClick(option, props.id)}
      key={index}
      style={styles}
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
