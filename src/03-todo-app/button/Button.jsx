import "./style.css";

export default function Button({ className, lable, onClick = () => {} }) {
  return (
    <button className={className} onClick={onClick}>
      {lable}
    </button>
  );
}
