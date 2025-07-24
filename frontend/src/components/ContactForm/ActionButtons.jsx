import s from "./ContactForm.module.css";

const ActionButtons = ({ isSubmitting, isLoading, onClose }) => {
  return (
    <div className={s.buttonGroup}>
      <button
        type="submit"
        disabled={isSubmitting || isLoading}
        className={s.btnSubmit}
      >
        {isSubmitting || isLoading ? "Adding..." : "Add Contact"}
      </button>
      {onClose && (
        <button type="button" onClick={onClose} className={s.btnCancel}>
          Cancel
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
