import React from "react";

const CustomButton = ({ children }) => {
  return (
    <div>
      <button className="primary-bg-color secondary-text-color rounded-lg my-4 w-96 h-12 font-bold text-2xl hover:bg-blue-900">
        {children}
      </button>
    </div>
  );
};

export default CustomButton;
