/**
 * Upload image to Cloudinary and return secure URL
 * @param {File} file - image file
 * @returns {Promise<string>} image URL
 */
export const uploadImageToCloudinary = async (file) => {
  if (!file) throw new Error("No file provided");

  const CLOUD_NAME = "ditqsg2se";
  const UPLOAD_PRESET = "gdgcteams";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const data = await response.json();

    return data.secure_url; // ✅ final image URL

  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};
