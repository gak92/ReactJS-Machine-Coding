import "./style.css";

export default function Step1({ stepKey, inputs, onChange = () => {} }) {
  const { firstName, lastName, email } = inputs;
  const handleChange = (e) => {
    onChange({
      stepKey,
      inputKey: e.target.name,
      value: e.target.value,
    });
  };
  return (
    <fieldset>
      <legend>Personal Information</legend>

      <div className="control-row">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={handleChange}
        />
      </div>

      <div className="control-row">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={handleChange}
        />
      </div>

      <div className="control-row">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
      </div>
    </fieldset>
  );
}
