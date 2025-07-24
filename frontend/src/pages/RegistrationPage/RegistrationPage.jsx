import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import s from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  return (
    <div className={s.container}>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
