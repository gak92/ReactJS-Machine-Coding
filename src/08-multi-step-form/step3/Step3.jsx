import "./style.css";

export default function Step3({ stepKey, inputs, onChange = () => {} }) {
  const { cardNumber, expirationDate, cvv } = inputs;
  const handleChange = (e) => {
    onChange({
      stepKey,
      inputKey: e.target.name,
      value: e.target.value,
    });
  };
  return (
    <fieldset>
      <legend>Payment Information</legend>

      <div className="control-row">
        <label htmlFor="cardNumber">Card Number</label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={cardNumber}
          onChange={handleChange}
        />
      </div>

      <div className="control-row">
        <label htmlFor="expirationDate">Expiration Date</label>
        <input
          type="text"
          id="expirationDate"
          name="expirationDate"
          value={expirationDate}
          onChange={handleChange}
        />
      </div>

      <div className="control-row">
        <label htmlFor="cvv">CVV</label>
        <input
          type="text"
          id="cvv"
          name="cvv"
          value={cvv}
          onChange={handleChange}
        />
      </div>
    </fieldset>
  );
}
