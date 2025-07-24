import s from "./ContactList.module.css";

const ErrorState = ({ error, onRetry }) => {
  return (
    <div className={s.errorContainer} role="alert">
      <p className={s.errorMessage}>
        {typeof error === "string"
          ? `Error loading contacts: ${error}`
          : "Failed to load contacts. Please try again."}
      </p>
      <button
        onClick={onRetry}
        className={s.retryButton}
        aria-label="Retry loading contacts"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorState;
