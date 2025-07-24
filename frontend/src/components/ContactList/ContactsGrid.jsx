import Contact from "../Contact/Contact";
import styles from "./ContactList.module.css";

const ContactsGrid = ({ contacts }) => {
  return (
    <div
      className={styles.contactsGrid}
      role="list"
      aria-label={`${contacts.length} contact${
        contacts.length === 1 ? "" : "s"
      } found`}
    >
      {contacts.map((contact) => (
        <Contact key={contact._id} item={contact} />
      ))}
    </div>
  );
};

export default ContactsGrid;
