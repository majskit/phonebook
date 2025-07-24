import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import {
  Divider,
  FormField,
  GoogleAuthButton,
  useAuthForm,
  BUTTON_TEXTS,
  FORM_FIELDS,
  INITIAL_VALUES,
  VALIDATION_SCHEMAS,
} from "../shared";
import s from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  const { isLoading, error, handleSubmit } = useAuthForm("register");

  return (
    <div className={s.container}>
      <h2 className={s.title}>Sign Up</h2>
      {error && (
        <div className={s.globalError} role="alert">
          {error}
        </div>
      )}

      <Formik
        initialValues={INITIAL_VALUES.register}
        validationSchema={VALIDATION_SCHEMAS.register}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={s.form}>
            <FormField
              name="name"
              type={FORM_FIELDS.name.type}
              placeholder={FORM_FIELDS.name.placeholder}
              label={FORM_FIELDS.name.label}
            />

            <FormField
              name="email"
              type={FORM_FIELDS.email.type}
              placeholder={FORM_FIELDS.email.placeholder}
              label={FORM_FIELDS.email.label}
            />

            <FormField
              name="password"
              type={FORM_FIELDS.password.type}
              placeholder={FORM_FIELDS.password.placeholder}
              label={FORM_FIELDS.password.label}
            />

            <button
              type="submit"
              className={s.button}
              disabled={isSubmitting || isLoading}
              aria-describedby={
                isSubmitting || isLoading ? "loading-status" : undefined
              }
            >
              {isSubmitting || isLoading
                ? BUTTON_TEXTS.register.submitting
                : BUTTON_TEXTS.register.submit}
              {(isSubmitting || isLoading) && (
                <span id="loading-status" className="sr-only">
                  Please wait, processing your request
                </span>
              )}
            </button>

            <Divider />

            <GoogleAuthButton text={BUTTON_TEXTS.register.google} />
          </Form>
        )}
      </Formik>

      <div className={s.links}>
        <p className={s.linkText}>
          Already have an account?{" "}
          <Link to="/login" className={s.link}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
