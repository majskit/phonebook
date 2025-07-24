import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login, register } from "../../redux/auth/operations";
import { selectAuthError, selectIsLoading } from "../../redux/auth/selectors";
import { MESSAGES, GOOGLE_AUTH_URL } from "./constants";
import { useNavigate } from "react-router-dom";

export const useAuthForm = (formType) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectAuthError);
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      await dispatch(login(values)).unwrap();
      toast.success(MESSAGES.login.success);
    } catch (error) {
      toast.error(error || MESSAGES.login.error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegister = async (values, { setSubmitting, resetForm }) => {
    try {
      await dispatch(register(values)).unwrap();
      toast.success(MESSAGES.register.success);
      resetForm();
      navigate("/login");
    } catch (error) {
      toast.error(error || MESSAGES.register.error);
      navigate("/login");
    } finally {
      setSubmitting(false);
    }
  };

  const handlers = {
    login: handleLogin,
    register: handleRegister,
  };

  return {
    isLoading,
    error,
    handleSubmit: handlers[formType],
  };
};

export const useGoogleAuth = () => {
  const handleGoogleAuth = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  return { handleGoogleAuth };
};
