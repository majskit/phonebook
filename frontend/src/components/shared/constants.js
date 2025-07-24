import * as Yup from "yup";

export const VALIDATION_SCHEMAS = {
  login: Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
  }),

  register: Yup.object().shape({
    name: Yup.string()
      .min(3, "Minimum 3 characters")
      .max(30, "Maximum 30 characters")
      .required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
  }),
};

export const INITIAL_VALUES = {
  login: { email: "", password: "" },
  register: { name: "", email: "", password: "" },
};

export const FORM_FIELDS = {
  name: {
    type: "text",
    placeholder: "Enter your full name",
    label: "Name",
  },
  email: {
    type: "email",
    placeholder: "Enter your email address",
    label: "Email",
  },
  password: {
    type: "password",
    placeholder: "Create a secure password",
    label: "Password",
  },
};

export const BUTTON_TEXTS = {
  login: {
    submit: "Sign In",
    submitting: "Signing In...",
    google: "Continue with Google",
  },
  register: {
    submit: "Sign Up",
    submitting: "Creating Account...",
    google: "Continue with Google",
  },
};

export const MESSAGES = {
  login: {
    success: "Welcome back!",
    error: "Login failed",
  },
  register: {
    success: "Registration successful! Welcome!",
    error: "Registration failed",
  },
};

export const GOOGLE_AUTH_URL = `${
  import.meta.env.VITE_BACKEND_URL
}/auth/google`;
