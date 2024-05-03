import React from "react";

function CustomAlert({ type, message }) {
  let baseClass =
    "mt-5 mb-5 h-6 flex flex-auto m-auto items-center justify-center border rounded-md text-white text-sm text-center w-96";

  let typeClass =
    type === "error"
      ? "bg-red-600"
      : type === "success"
      ? "bg-green-800"
      : "bg-yellow-600";

  // Combine the base class with the type-specific class
  let className = `${baseClass} ${typeClass}`;

  return <div className={className}>{message && <p>{message}</p>}</div>;
}

export default CustomAlert;
