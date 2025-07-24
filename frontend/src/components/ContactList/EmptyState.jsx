import s from "./ContactList.module.css";

const EmptyState = ({ hasFilters }) => {
  return (
    <div className={s.emptyState} role="status">
      <p>
        {hasFilters
          ? "No contacts match your search criteria"
          : "No contacts found. Add your first contact to get started!"}
      </p>
    </div>
  );
};

export default EmptyState;
