import React from "react";

const Button = ({
    children,
  text,
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  variant = "primary",
  className = "",
  
}) => {
  const baseStyle =
    "px-5 py-2 rounded-lg font-medium transition duration-200 focus:outline-none";

  const variants = {
    primary: "bg-[#001F54] text-white hover:bg-[#00163d]",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    outline:
      "border border-[#001F54] text-[#001F54] hover:bg-[#001F54] hover:text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyle} ${
        variants[variant]
      } ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {loading ? "Loading..." : children || text}
    </button>
  );
};

export default Button;