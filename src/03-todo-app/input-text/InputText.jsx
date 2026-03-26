import "./style.css";

export default function InputText({ value, onChange }) {
  function handleChange(e) {
    onChange(e.target.value);
  }
  return (
    <input
      type="text"
      placeholder="Add a todo"
      value={value}
      onChange={handleChange}
    />
  );
}
