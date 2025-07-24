import { ErrorMessage, Field } from "formik";
import s from "./FormField.module.css";

const FormField = ({ name, type, placeholder, label, className }) => {
  return (
    <div className={s.fieldWrapper}>
      <label htmlFor={name} className={s.label}>
        {label}
      </label>
      <Field
        name={name}
        type={type}
        className={`${s.input} ${className || ""}`}
        id={name}
        placeholder={placeholder}
        aria-describedby={`${name}-error`}
      />
      <ErrorMessage
        name={name}
        component="div"
        className={s.errorMessage}
        id={`${name}-error`}
        role="alert"
      />
    </div>
  );
};

export default FormField;
