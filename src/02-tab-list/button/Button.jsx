import "./style.css";

export default function Button({ label, onClick = () => {}, ...rest }) {
  return (
    <button onClick={onClick} {...rest}>
      {label}
    </button>
  );
}
