import Loader from "../Loader/Loader";
import s from "./ContactList.module.css";

const LoadingOverlay = () => {
  return (
    <div
      className={s.loadingOverlay}
      role="status"
      aria-label="Updating contacts"
    >
      <Loader />
    </div>
  );
};

export default LoadingOverlay;
