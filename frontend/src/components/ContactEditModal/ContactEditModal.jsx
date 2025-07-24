import { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { updateContact } from "../../redux/contacts/operations";
import { selectLoading } from "../../redux/contacts/selectors";
import { FaTimes } from "../shared/icons";
import css from "./ContactEditModal.module.css";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Must be at least 3 characters")
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  phoneNumber: Yup.string()
    .matches(/^\+?[0-9]{3,20}$/, "Phone number is not valid")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .min(3, "Must be at least 3 characters")
    .max(20, "Must be 20 characters or less"),
  contactType: Yup.string()
    .oneOf(["work", "home", "personal"], "Invalid contact type")
    .required("Required"),
  isFavourite: Yup.boolean(),
});

const ContactEditModal = ({ contact, onClose }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(contact.photo || null);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const initialValues = {
    name: contact.name || "",
    phoneNumber: contact.phoneNumber || "",
    email: contact.email || "",
    contactType: contact.contactType || "personal",
    isFavourite: contact.isFavourite || false,
  };

  const handlePhotoChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedPhoto(file);
      setFieldValue("photo", file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const contactData = {
        name: values.name,
        phoneNumber: values.phoneNumber,
        email: values.email || undefined,
        contactType: values.contactType,
        isFavourite: values.isFavourite,
      };

      if (selectedPhoto) {
        contactData.photo = selectedPhoto;
      }

      await dispatch(
        updateContact({
          id: contact._id,
          contactData,
        })
      ).unwrap();

      onClose();
    } catch (error) {
      console.error("Failed to update contact:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <div className={css.header}>
          <h2>Edit Contact</h2>
          <button type="button" onClick={onClose} className={css.closeBtn}>
            <FaTimes />
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className={css.form}>
              <div className={css.fieldWrapper}>
                <label htmlFor="name" className={css.label}>
                  Name *
                </label>
                <Field
                  name="name"
                  type="text"
                  className={css.inputField}
                  id="name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={css.errorMessage}
                />
              </div>

              <div className={css.fieldWrapper}>
                <label htmlFor="phoneNumber" className={css.label}>
                  Phone Number *
                </label>
                <Field
                  name="phoneNumber"
                  type="tel"
                  className={css.inputField}
                  id="phoneNumber"
                  placeholder="+1234567890"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className={css.errorMessage}
                />
              </div>

              <div className={css.fieldWrapper}>
                <label htmlFor="email" className={css.label}>
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className={css.inputField}
                  id="email"
                  placeholder="contact@example.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.errorMessage}
                />
              </div>

              <div className={css.fieldWrapper}>
                <label htmlFor="contactType" className={css.label}>
                  Contact Type *
                </label>
                <Field
                  as="select"
                  name="contactType"
                  className={css.selectField}
                  id="contactType"
                >
                  <option value="personal">Personal</option>
                  <option value="work">Work</option>
                  <option value="home">Home</option>
                </Field>
                <ErrorMessage
                  name="contactType"
                  component="div"
                  className={css.errorMessage}
                />
              </div>

              <div className={css.fieldWrapper}>
                <label htmlFor="photo" className={css.label}>
                  Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoChange(e, setFieldValue)}
                  className={css.fileInput}
                  id="photo"
                />
                {photoPreview && (
                  <div className={css.photoPreview}>
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className={css.previewImage}
                    />
                  </div>
                )}
              </div>

              <div className={css.checkboxWrapper}>
                <Field type="checkbox" name="isFavourite" id="isFavourite" />
                <label htmlFor="isFavourite" className={css.checkboxLabel}>
                  Add to favorites
                </label>
              </div>

              <div className={css.buttonGroup}>
                <button
                  type="button"
                  onClick={onClose}
                  className={css.btnCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className={css.btnSubmit}
                >
                  {isSubmitting || isLoading ? "Updating..." : "Update Contact"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContactEditModal;
