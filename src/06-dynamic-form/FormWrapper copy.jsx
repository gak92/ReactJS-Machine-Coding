import "./style.css";
import TextField from "./text-field";
import CheckBox from "./check-box";

export default function FormWrapper({
  formInput,
  onInputChange,
  onInputBlur,
  onCancel,
  onSubmit,
  disableSubmit,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }
  return (
    <form className="form-wrapper" onSubmit={handleSubmit}>
      <h2>Dynamic Form</h2>
      {formInput.map((input, index) => {
        if (input.type === "checkbox") {
          return (
            <CheckBox
              key={index}
              index={index}
              {...input}
              onChange={onInputChange}
            />
          );
        }

        return (
          <TextField
            key={index}
            index={index}
            {...input}
            onChange={onInputChange}
            onBlur={onInputBlur}
          />
        );
      })}

      <div>
        <button onClick={onCancel}>Cancel</button>
        <button type="submit" disabled={disableSubmit}>
          Submit
        </button>
      </div>
    </form>
  );
}
