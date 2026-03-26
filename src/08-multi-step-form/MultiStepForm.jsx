import "./style.css";
import { useState } from "react";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";

const Page = {
  step1: 1,
  step2: 2,
  step3: 3,
};
const Final_Step = Page.step3;

export default function MultiStepForm({
  onSubmit = () => {},
  onCancel = () => {},
}) {
  const [currentStep, setCurrentStep] = useState(Page.step1);

  const Steps = {
    [Page.step1]: Step1,
    [Page.step2]: Step2,
    [Page.step3]: Step3,
  };
  const Component = Steps[currentStep];
  const submitButtonText = currentStep === Final_Step ? "Submit" : "Next";

  const [formInputs, setFormInputs] = useState({
    step1: {
      firstName: "",
      lastName: "",
      email: "",
    },
    step2: {
      phone: "",
      city: "",
      state: "",
      zipCode: "",
    },
    step3: {
      cardNumber: "",
      expirationDate: "",
      cvv: "",
    },
  });

  const inputToSend = formInputs[`step${currentStep}`];

  const handleNext = () => {
    if (currentStep === Page.step1) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === Page.step2) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(formInputs);
    }
  };
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  function handleInputChange({ stepKey, value, inputKey }) {
    const oldInputs = structuredClone(formInputs);
    oldInputs[stepKey][inputKey] = value;
    setFormInputs(oldInputs);
  }

  return (
    <div className="multi-step-form">
      <button
        type="button"
        onClick={handleBack}
        disabled={currentStep === Page.step1}
      >
        Back
      </button>
      <form>
        <Component
          stepKey={`step${currentStep}`}
          inputs={inputToSend}
          onChange={handleInputChange}
        />

        <div>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" onClick={handleNext}>
            {submitButtonText}
          </button>
        </div>
      </form>
    </div>
  );
}
