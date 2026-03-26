import "./App.css";
import { useState } from "react";
import FormWrapper from "./06-dynamic-form";

const formConfig = [
  {
    type: "text",
    label: "First Name",
    placeholder: "Enter your first name",
    value: "",
    name: "firstName",
    id: "firstName",
    required: true,
    error: "",
    disabled: false,
    readOnly: false,
  },
  {
    type: "text",
    label: "Last Name",
    placeholder: "Enter your last name",
    value: "",
    name: "lastName",
    id: "lastName",
    required: false,
    error: "",
    disabled: false,
    readOnly: false,
  },
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
  },
  {
    type: "text",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    value: "",
    name: "phoneNumber",
    id: "phoneNumber",
    required: false,
    error: "",
    disabled: false,
    readOnly: false,
  },
  {
    type: "checkbox",
    label: "Accept Terms and Conditions",
    value: "acceptTerms",
    name: "acceptTerms",
    id: "acceptTerms",
    required: false,
    error: "",
    disabled: false,
    readOnly: false,
    checked: false,
  },
];

export default function App6() {
  const [formInput, setFormInput] = useState(structuredClone(formConfig));

  // on input change
  function onInputChange({ id, index, type, value, checked }) {
    // console.log(id, index, type, value, checked);
    const oldState = structuredClone(formInput);

    if (type === "checkbox") {
      oldState[index].checked = checked;
    } else {
      oldState[index].value = value;
    }

    oldState[index].error = "";
    setFormInput(oldState);
  }

  // on input blur
  function onInputBlur({ id, index, type, value, checked }) {
    const oldState = structuredClone(formInput);

    if (type === "text") {
      if (value.length < 3) {
        oldState[index].error =
          `${oldState[index].label} must be at least 3 characters long`;
      } else {
        oldState[index].error = "";
      }
    }

    setFormInput(oldState);
  }

  function handleCancel() {
    setFormInput(structuredClone(formConfig));
  }

  function handleSubmit() {
    const params = {};

    formInput.forEach((input) => {
      if (input.type === "checkbox") {
        if (input.checked) {
          params[input.name] = input.value;
        }
      } else {
        params[input.name] = input.value;
      }
    });
    console.log("form submitted: ", params);
  }

  function needToDisableSubmit() {
    let disable = false;
    // disable = formInput.some((input) => !input.value);

    formInput.forEach((input) => {
      if (input.required && !input.value) {
        disable = true;
      }
    });

    return disable;
  }
  const disableSubmit = needToDisableSubmit();
  console.log("disable submit: ", disableSubmit);

  return (
    <FormWrapper
      formInput={formInput}
      onInputChange={onInputChange}
      onInputBlur={onInputBlur}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
      disableSubmit={disableSubmit}
    />
  );
}
