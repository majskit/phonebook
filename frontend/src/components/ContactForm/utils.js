import { FILE_CONSTRAINTS } from "./constants";

export const validateFile = (file) => {
  if (!file) return { isValid: true };

  if (file.size > FILE_CONSTRAINTS.maxSize) {
    return {
      isValid: false,
      error: `File size must be less than ${
        FILE_CONSTRAINTS.maxSize / (1024 * 1024)
      }MB`,
    };
  }

  if (!FILE_CONSTRAINTS.allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: "Only JPEG, PNG, and WebP images are allowed",
    };
  }

  return { isValid: true };
};

export const createImagePreview = (file, callback) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
};

export const resetFileInput = (inputId) => {
  const fileInput = document.getElementById(inputId);
  if (fileInput) fileInput.value = "";
};

export const processFileSelection = (
  file,
  setSelectedPhoto,
  setPhotoPreview,
  setFileError,
  setFieldValue
) => {
  const validation = validateFile(file);
  if (!validation.isValid) {
    setFileError(validation.error);
    return false;
  }

  setFileError("");
  setSelectedPhoto(file);
  setFieldValue("photo", file);

  createImagePreview(file, setPhotoPreview);
  return true;
};
