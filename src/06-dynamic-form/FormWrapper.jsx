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

      {Object.keys(formInput).map((key) => {
        const data = formInput[key];
        return (
          <fieldset key={key}>
            <legend>{data.name}</legend>
            {data.formInputs.map((input, index) => {
              if (input.type === "checkbox") {
                return (
                  <CheckBox
                    key={input.id}
                    index={index}
                    categoryKey={key}
                    {...input}
                    onChange={onInputChange}
                  />
                );
              }

              return (
                <TextField
                  key={input.id}
                  index={index}
                  categoryKey={key}
                  {...input}
                  onChange={onInputChange}
                  onBlur={onInputBlur}
                />
              );
            })}
          </fieldset>
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
