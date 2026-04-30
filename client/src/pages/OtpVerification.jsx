import React, { useRef, useState } from "react";
import Button from "../components/ui/Button";

const OtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length < 4) {
      setError("Please enter complete OTP");
      return;
    }

    setError("");
    console.log("Entered OTP:", code);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-[#001F54] mb-2">
          OTP Verification
        </h2>

        <p className="text-gray-500 text-center mb-6 text-sm">
          Enter the 4-digit code sent to your email
        </p>

        <div className="flex justify-center gap-3 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
              className="w-14 h-14 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#001F54] outline-none"
            />
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        <Button type="submit" className="w-full mt-4">
          Verify OTP
        </Button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Didn’t receive code?{" "}
          <button
            type="button"
            className="text-[#001F54] font-medium hover:underline"
          >
            Resend
          </button>
        </p>
      </form>
    </div>
  );
};

export default OtpVerification;