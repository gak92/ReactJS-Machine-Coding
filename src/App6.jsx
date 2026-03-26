import "./App.css";
import { useState } from "react";
import FormWrapper from "./06-dynamic-form";

const categories = {
  personal_details: {
    name: "Personal Details",
    formInputs: [
      {
        type: "text",
        label: "First Name",
        placeholder: "Enter your first name",
        value: "",
        name: "firstName",
        id: "firstName",
        required: true,
        error: "",
        description: "Enter your first name",
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
        description: "Enter your last name",
        disabled: false,
        readOnly: false,
      },
    ],
  },
  contact_details: {
    name: "Contact Details",
    formInputs: [
      {
        type: "text",
        label: "Email",
        placeholder: "Enter your email",
        value: "",
        name: "email",
        id: "email",
        required: true,
        error: "",
        description: "Enter your email",
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
        description: "Enter your phone number",
        disabled: false,
        readOnly: false,
      },
    ],
  },
  extras: {
    name: "Extras",
    formInputs: [
      {
        type: "checkbox",
        label: "Accept Terms and Conditions",
        value: "acceptTerms",
        name: "acceptTerms",
        id: "acceptTerms",
        required: false,
        error: "",
        description: "Accept terms and conditions",
        disabled: false,
        readOnly: false,
        checked: false,
      },
    ],
  },
};

export default function App6() {
  const [formInput, setFormInput] = useState(structuredClone(categories));

  // on input change
  function onInputChange({ id, index, type, value, checked, categoryKey }) {
    // console.log(id, index, type, value, checked);
    const oldState = structuredClone(formInput);

    if (type === "checkbox") {
      oldState[categoryKey].formInputs[index].checked = checked;
    } else {
      oldState[categoryKey].formInputs[index].value = value;
    }

    oldState[categoryKey].formInputs[index].error = "";
    setFormInput(oldState);
  }

  // on input blur
  function onInputBlur({ id, index, type, value, checked, categoryKey }) {
    const oldState = structuredClone(formInput);

    if (type === "text") {
      if (value.length < 3) {
        oldState[categoryKey].formInputs[index].error =
          `${oldState[categoryKey].formInputs[index].label} must be at least 3 characters long`;
      } else {
        oldState[categoryKey].formInputs[index].error = "";
      }
    }

    setFormInput(oldState);
  }

  function handleCancel() {
    setFormInput(structuredClone(categories));
  }

  function handleSubmit() {
    const params = {};

    Object.keys(formInput).forEach((key) => {
      const data = formInput[key];
      data.formInputs.forEach((input) => {
        if (input.type === "checkbox") {
          if (input.checked) {
            params[input.name] = input.value;
          }
        } else {
          params[input.name] = input.value;
        }
      });
    });

    console.log("form submitted: ", params);
  }

  function needToDisableSubmit() {
    let disable = false;

    Object.keys(formInput).forEach((key) => {
      const data = formInput[key];
      data.formInputs.forEach((input) => {
        if (input.required && !input.value) {
          disable = true;
        }
      });
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

/*
Homework
1. add checkbox group: e.g: hobbies: ["reading", "writing", "coding"]
2. add radio support: 
3. change the layout to two control per row

*/
