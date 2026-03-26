import "./style.css";

export default function Step2({ stepKey, inputs, onChange = () => {} }) {
  const { phone, city, state, zipCode } = inputs;
  const handleChange = (e) => {
    onChange({
      stepKey,
      inputKey: e.target.name,
      value: e.target.value,
    });
  };
  return (
    <fieldset>
      <legend>Contact Information</legend>

      <div className="control-row">
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={phone}
          onChange={handleChange}
        />
      </div>

      <div className="control-row">
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={city}
          onChange={handleChange}
        />
      </div>

      <div className="control-row">
        <label htmlFor="state">State</label>
        <input
          type="text"
          id="state"
          name="state"
          value={state}
          onChange={handleChange}
        />
      </div>

      <div className="control-row">
        <label htmlFor="zipCode">Zip Code</label>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          value={zipCode}
          onChange={handleChange}
        />
      </div>
    </fieldset>
  );
}
