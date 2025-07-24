import { useState, useEffect } from "react";
import { FaPlus } from "@/components/shared/icons";
import { useSelector } from "react-redux";
import ContactForm from "@/components/ContactForm/ContactForm";
import ContactList from "@/components/ContactList/ContactList";
import SearchBox from "@/components/SearchBox/SearchBox";
import FilterControls from "@/components/FilterControls/FilterControls";
import { selectIsLoggedIn } from "@/redux/auth/selectors";
import s from "./ContactsPage.module.css";

const ContactsPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  useEffect(() => {
    if (isFormOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFormOpen]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.titleSection}>
          <h1 className={s.title}>Contacts</h1>
        </div>

        <button onClick={() => setIsFormOpen(true)} className={s.addButton}>
          <FaPlus />
          Add Contact
        </button>
      </div>

      <div className={s.searchSection}>
        <SearchBox />
        <FilterControls />
      </div>

      <div className={s.content}>
        <ContactList />
      </div>

      {isFormOpen && (
        <div className={s.modalBackdrop} onClick={handleCloseForm}>
          <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
            <ContactForm onClose={handleCloseForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsPage;
