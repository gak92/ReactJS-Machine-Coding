import Otp from "./09-otp";

export default function App9() {
  const handleOTPComplete = (otp) => {
    console.log("OTP entered successfully", otp);
  };

  return (
    <div>
      <Otp count={4} onOTPComplete={handleOTPComplete} />
    </div>
  );
}
