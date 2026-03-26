import { useState } from "react";
import MultiStepForm from "./08-multi-step-form";

export default function App8() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [cancel, setCancel] = useState(false);

  function handleFormSubmit(data) {
    console.log("Form Submitted");
    console.log(data);
    setFormSubmitted(true);
  }
  return (
    <div>
      {formSubmitted && <p>Form Submitted Successfully</p>}
      {!formSubmitted && <MultiStepForm onSubmit={handleFormSubmit} />}

      {cancel && <p>Form Cancelled</p>}
    </div>
  );
}
