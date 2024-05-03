import React from "react";

function CustomAlert({ type, message }) {
  let baseClass =
    "mt-5 mb-5 h-8 inline-block align-middle border rounded-md text-white text-sm text-center w-full";
  let typeClass =
    type === "error"
      ? "bg-red-800"
      : type === "success"
      ? "bg-green-800"
      : "bg-gray-600";

  // Combine the base class with the type-specific class
  let className = `${baseClass} ${typeClass}`;

  return <>{message && <p className={className}>{message}</p>}</>;
}

export default CustomAlert;
