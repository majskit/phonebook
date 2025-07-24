import {
  FaPhoneAlt,
  FaEnvelope,
  FaHeart,
  FaRegHeart,
  FaEdit,
  FaTrash,
  MdWork,
  MdHome,
  MdPerson,
} from "@/components/shared/icons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { deleteContact, updateContact } from "@/redux/contacts/operations";
import { selectLoading } from "@/redux/contacts/selectors";
import { toast } from "react-toastify";
import ContactEditModal from "@/components/ContactEditModal/ContactEditModal";
import s from "./Contact.module.css";

const Contact = ({ item }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const getContactTypeIcon = (type) => {
    switch (type) {
      case "work":
        return <MdWork className={s.typeIcon} />;
      case "home":
        return <MdHome className={s.typeIcon} />;
      case "personal":
        return <MdPerson className={s.typeIcon} />;
      default:
        return <MdPerson className={s.typeIcon} />;
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${item.name}?`)) {
      try {
        await dispatch(deleteContact(item._id)).unwrap();
      } catch (error) {
        toast.error(error || "Failed to delete contact");
      }
    }
  };

  const handleToggleFavorite = async () => {
    try {
      await dispatch(
        updateContact({
          id: item._id,
          contactData: { isFavourite: !item.isFavourite },
        })
      ).unwrap();
      toast.success(
        item.isFavourite ? "Removed from favorites" : "Added to favorites"
      );
    } catch (error) {
      toast.error(error || "Failed to update contact");
    }
  };

  return (
    <>
      <div className={`${s.contactCard} ${isLoading ? s.loading : ""}`}>
        <div className={s.photoContainer}>
          {item.photo ? (
            <img src={item.photo} alt={item.name} className={s.photo} />
          ) : (
            <div className={s.photoPlaceholder}>
              {item.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className={s.contactInfo}>
          <div className={s.header}>
            <h3 className={s.name}>{item.name}</h3>
            <div className={s.badges}>
              {getContactTypeIcon(item.contactType)}
              <span className={s.contactType}>{item.contactType}</span>
            </div>
          </div>

          <div className={s.contactDetails}>
            <p className={s.detail}>
              <FaPhoneAlt className={s.icon} />
              <a href={`tel:${item.phoneNumber}`} className={s.link}>
                {item.phoneNumber}
              </a>
            </p>

            {item.email && (
              <p className={s.detail}>
                <FaEnvelope className={s.icon} />
                <a href={`mailto:${item.email}`} className={s.link}>
                  {item.email}
                </a>
              </p>
            )}
          </div>

          <div className={s.actions}>
            <button
              onClick={handleToggleFavorite}
              className={`${s.actionBtn} ${s.favoriteBtn}`}
              disabled={isLoading}
              title={
                item.isFavourite ? "Remove from favorites" : "Add to favorites"
              }
            >
              {item.isFavourite ? (
                <FaHeart className={s.favoriteIconFilled} />
              ) : (
                <FaRegHeart className={s.favoriteIcon} />
              )}
            </button>

            <button
              onClick={() => setIsEditModalOpen(true)}
              className={`${s.actionBtn} ${s.editBtn}`}
              disabled={isLoading}
              title="Edit contact"
            >
              <FaEdit />
            </button>

            <button
              onClick={handleDelete}
              className={`${s.actionBtn} ${s.deleteBtn}`}
              disabled={isLoading}
              title="Delete contact"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <ContactEditModal
          contact={item}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </>
  );
};

export default Contact;
