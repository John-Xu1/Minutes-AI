import "./textBox.css";

const TextBox = (props) => {
  if (props.role === "user")
    return (
      <li className="textBox" id="user">
        {props.content}
      </li>
    );
  else
    return (
      <li className="textBox" id="assistant">
        {props.content}
      </li>
    );
};

export default TextBox;
