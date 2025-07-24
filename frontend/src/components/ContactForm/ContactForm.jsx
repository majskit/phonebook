import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { FaTimes } from "../shared/icons";
import { addContact } from "../../redux/contacts/operations";
import { selectLoading } from "../../redux/contacts/selectors";
import { toast } from "react-toastify";
import ActionButtons from "./ActionButtons";
import PhotoUploadArea from "./PhotoUploadArea";
import { CONTACT_TYPES, INITIAL_VALUES, validationSchema } from "./constants";
import s from "./ContactForm.module.css";

const ContactForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  const handleSubmit = useCallback(
    async (values, { resetForm, setSubmitting }) => {
      try {
        const contactData = {
          name: values.name,
          phoneNumber: values.phoneNumber,
          email: values.email || undefined,
          contactType: values.contactType,
          isFavourite: values.isFavourite,
        };

        if (values.photo) {
          contactData.photo = values.photo;
        }

        await dispatch(addContact(contactData)).unwrap();
        toast.success("Contact added successfully!");
        resetForm();
        if (onClose) onClose();
      } catch (error) {
        toast.error(error || "Failed to add contact");
      } finally {
        setSubmitting(false);
      }
    },
    [dispatch, onClose]
  );

  return (
    <div className={s.contactForm}>
      <div className={s.formHeader}>
        <h3 className={s.formTitle}>Add New Contact</h3>
        <button
          type="button"
          className={s.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          <FaTimes />
        </button>
      </div>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={s.fieldWrapper}>
              <label htmlFor="name" className={s.label}>
                Name *
              </label>
              <Field
                name="name"
                type="text"
                className={s.inputField}
                id="name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className={s.errorMessage}
              />
            </div>

            <div className={s.fieldWrapper}>
              <label htmlFor="phoneNumber" className={s.label}>
                Phone Number *
              </label>
              <Field
                name="phoneNumber"
                type="tel"
                className={s.inputField}
                id="phoneNumber"
                placeholder="+1234567890"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className={s.errorMessage}
              />
            </div>

            <div className={s.fieldWrapper}>
              <label htmlFor="email" className={s.label}>
                Email
              </label>
              <Field
                name="email"
                type="email"
                className={s.inputField}
                id="email"
                placeholder="contact@example.com"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={s.errorMessage}
              />
            </div>

            <div className={s.fieldWrapper}>
              <label htmlFor="contactType" className={s.label}>
                Contact Type *
              </label>
              <Field
                as="select"
                name="contactType"
                className={s.selectField}
                id="contactType"
              >
                {CONTACT_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="contactType"
                component="div"
                className={s.errorMessage}
              />
            </div>

            <div className={s.fieldWrapper}>
              <label htmlFor="photo" className={s.label}>
                Photo
              </label>
              <Field name="photo">
                {({ form, meta }) => (
                  <PhotoUploadArea
                    onFileChange={(file) => form.setFieldValue("photo", file)}
                    onFileRemove={() => form.setFieldValue("photo", null)}
                    error={meta.error && meta.touched ? meta.error : null}
                  />
                )}
              </Field>
            </div>

            <div className={s.checkboxWrapper}>
              <Field type="checkbox" name="isFavourite" id="isFavourite" />
              <label htmlFor="isFavourite" className={s.checkboxLabel}>
                Add to favourites
              </label>
            </div>

            <ActionButtons
              isSubmitting={isSubmitting}
              isLoading={isLoading}
              onClose={onClose}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
