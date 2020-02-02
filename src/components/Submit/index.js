import React from "react";

const Submit = ({ label, className }) => {
  return (
    <input
      type="submit"
      name="submit"
      className={["form-Submit", className].join(" ")}
      value={label}
    />
  );
};

export default Submit;
