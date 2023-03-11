export default function box(props) {
  const styles = { backgroundColor: props.isClicked ? "#d6dbf5" : "#f5f7fb" };
  const options = props.options.map((i) => (
    <button className="btn option-btn">{i}</button>
  ));
  return (
    <div className="box">
      <div className="question">{props.question}</div>
      <div className="options">{options}</div>
    </div>
  );
}
