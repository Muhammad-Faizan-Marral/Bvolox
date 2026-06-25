import React, { useState } from "react";
import { uploadToCloudinary } from "../../lib/cloudinary";
import Spinner from "./Spinner";
const ImageUploader = ({ onUploadSuccess, defaultPreview = "" }) => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(defaultPreview);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Local preview dikhane ke liye
    setPreview(URL.createObjectURL(file));
    setLoading(true);

    try {
      const imageUrl = await uploadToCloudinary(file);
      if (imageUrl) {
        onUploadSuccess(imageUrl);
      }
    } catch (error) {
      alert("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-24 h-24 rounded-full object-cover border"
        />
      )}

      <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
        {loading ? <Spinner /> : "Choose Image"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={loading}
        />
      </label>
    </div>
  );
};

export default ImageUploader;
