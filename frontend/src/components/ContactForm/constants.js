import * as Yup from "yup";

export const CONTACT_TYPES = [
  { value: "personal", label: "Personal" },
  { value: "work", label: "Work" },
  { value: "home", label: "Home" },
];

export const FILE_CONSTRAINTS = {
  maxSize: 1024 * 1024,
  allowedTypes: ["image/jpeg", "image/png", "image/webp"],
  allowedExtensions: [".jpg", ".jpeg", ".png", ".webp"],
};

export const PHONE_REGEX = /^\+?[0-9]{3,20}$/;

export const INITIAL_VALUES = {
  name: "",
  phoneNumber: "",
  email: "",
  contactType: "personal",
  isFavourite: false,
  photo: null,
};

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Must be at least 3 characters")
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  phoneNumber: Yup.string()
    .matches(PHONE_REGEX, "Phone number is not valid")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .min(3, "Must be at least 3 characters")
    .max(20, "Must be 20 characters or less"),
  contactType: Yup.string()
    .oneOf(
      CONTACT_TYPES.map((type) => type.value),
      "Invalid contact type"
    )
    .required("Required"),
  isFavourite: Yup.boolean(),
  photo: Yup.mixed()
    .nullable()
    .test(
      "fileSize",
      `File size must be less than ${
        FILE_CONSTRAINTS.maxSize / (1024 * 1024)
      }MB`,
      (value) => !value || value.size <= FILE_CONSTRAINTS.maxSize
    )
    .test(
      "fileFormat",
      "Only JPEG, PNG, and WebP images are allowed",
      (value) => !value || FILE_CONSTRAINTS.allowedTypes.includes(value.type)
    ),
});
