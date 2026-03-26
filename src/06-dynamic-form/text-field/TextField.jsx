import "./style.css";

/**
  {
    type: "text",
    label: "Email",
    placeholder: "Enter your email",
    value: "",
    name: "email",
    id: "email",
    required: true,
    error: "",
    disabled: false,
    readOnly: false,
  }
 */

export default function TextField({
  label = "",
  placeholder = "",
  value = "",
  name = "",
  id = "",
  required = false,
  error = "",
  description = "",
  disabled = false,
  readOnly = false,
  onBlur,
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
      value: e.target.value,
    });
  }

  function handleBlur(e) {
    onBlur({
      id,
      index,
      type,
      categoryKey,
      value: e.target.value,
    });
  }

  return (
    <div className="text-field">
      <label htmlFor={id}>
        {label}
        {required && <sup>*</sup>}
      </label>
      <input
        type="text"
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        autoComplete="off"
        onChange={handleChange}
        onBlur={handleBlur}
        aria-describedby={description ? `desc-${id}` : undefined}
        aria-invalid={!!error}
        aria-errormessage={!!error ? `error-${id}` : undefined}
      />
      {!!description && (
        <span className="description" id={`desc-${id}`}>
          {description}
        </span>
      )}
      <span className="error" id={`error-${id}`}>
        {error}
      </span>
    </div>
  );
}
