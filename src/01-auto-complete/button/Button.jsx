import React from "react";
import "./style.css";

function Button({ label, onClick = () => {}, ...rest }) {
  return (
    <button onClick={onClick} {...rest}>
      {label}
    </button>
  );
}

export default Button;
