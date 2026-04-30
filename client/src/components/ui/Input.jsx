import React from "react";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  className = "",
}) => {
  return (
    <div className="w-full mb-4">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-2 border rounded-lg outline-none transition duration-200
          ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-300"
              : "border-gray-300 focus:ring-2 focus:ring-blue-300"
          }
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          ${className}`}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;