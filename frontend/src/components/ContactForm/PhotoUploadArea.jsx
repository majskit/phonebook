import { useState, useCallback } from "react";
import { FaTrash } from "../shared/icons";
import { createImagePreview, resetFileInput } from "./utils";
import s from "./ContactForm.module.css";

const PhotoUploadArea = ({ onFileChange, onFileRemove, error }) => {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = useCallback(
    (event) => {
      const file = event.target.files[0];
      if (file) {
        onFileChange(file);
        createImagePreview(file, setPhotoPreview);
      }
    },
    [onFileChange]
  );

  const handleRemovePhoto = useCallback(() => {
    onFileRemove();
    setPhotoPreview(null);
    resetFileInput("photo");
  }, [onFileRemove]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        onFileChange(file);
        createImagePreview(file, setPhotoPreview);
      }
    },
    [onFileChange]
  );

  return (
    <>
      <div
        className={`${s.dropZone} ${dragOver ? s.dragOver : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className={s.fileInput}
          id="photo"
        />
        <p className={s.dropText}>
          {dragOver
            ? "Drop image here"
            : "Drag & drop an image or click to select"}
        </p>
        <p className={s.fileHint}>JPEG, PNG, WebP up to 1MB</p>
      </div>

      {error && <div className={s.errorMessage}>{error}</div>}

      {photoPreview && (
        <div className={s.photoPreview}>
          <img src={photoPreview} alt="Preview" className={s.previewImage} />
          <button
            type="button"
            onClick={handleRemovePhoto}
            className={s.removePhotoBtn}
            aria-label="Remove photo"
          >
            <FaTrash />
          </button>
        </div>
      )}
    </>
  );
};

export default PhotoUploadArea;
