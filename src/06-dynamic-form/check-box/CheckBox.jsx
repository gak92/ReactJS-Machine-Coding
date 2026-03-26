import "./style.css";
/**
 {
    type: "checkbox",
    label: "Accept Terms and Conditions",
    value: "acceptTerms",
    name: "acceptTerms",
    id: "acceptTerms",
    required: true,
    error: "",
    disabled: false,
    readOnly: false,
    checked: false,
  }
 */
export default function CheckBox({
  label = "",
  value = "",
  name = "",
  id = "",
  // required = false,
  error = "",
  disabled = false,
  readOnly = false,
  checked = false,
  onChange,
  index,
  type,
  categoryKey,
}) {
  function handleChange(e) {
    onChange({
      id,
      index,
      type,
      categoryKey,
      checked: !checked,
    });
  }

  return (
    <div className="check-box">
      <input
        type="checkbox"
        name={name}
        id={id}
        value={value}
        // required={required}
        disabled={disabled}
        readOnly={readOnly}
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={id}>{label}</label>
      {!!error && <p className="error">{error}</p>}
    </div>
  );
}
