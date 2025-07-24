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
import s from "./LoginForm.module.css";

const LoginForm = () => {
  const { isLoading, error, handleSubmit } = useAuthForm("login");

  return (
    <div className={s.container}>
      <h2 className={s.title}>Sign In</h2>
      {error && (
        <div className={s.globalError} role="alert">
          {error}
        </div>
      )}

      <Formik
        initialValues={INITIAL_VALUES.login}
        validationSchema={VALIDATION_SCHEMAS.login}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={s.form}>
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
                ? BUTTON_TEXTS.login.submitting
                : BUTTON_TEXTS.login.submit}
              {(isSubmitting || isLoading) && (
                <span id="loading-status" className="sr-only">
                  Please wait, signing you in
                </span>
              )}
            </button>

            <Divider />

            <GoogleAuthButton text={BUTTON_TEXTS.login.google} />
          </Form>
        )}
      </Formik>

      <div className={s.links}>
        <p className={s.linkText}>
          Don&apos;t have an account?{" "}
          <Link to="/register" className={s.link}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
