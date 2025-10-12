import React from "react";
import '../assets/styles/components/InputField.scss'

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

function InputField({ label, ...props }: InputFieldProps) {
  return (
    <div className="input-field">
      {label && <label>{label}</label>}
      <input {...props} />
    </div>
  );
}

export default InputField
