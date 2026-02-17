import React, { useState } from "react";
import classes from "./AddMember.module.css";
import { HiCamera, HiUser, HiUserGroup, HiLink, HiCode } from "react-icons/hi";
import { setMemberdata } from "../../../SetData/setMemberData";
import { uploadImageToCloudinary} from "../../../SetData/uploadImageToCloudinary";

function AddMember() {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    domain: "",
    instagram: "",
    linkedin: "",
    github: "",
    imageUrl: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1️⃣ Show preview instantly
    const previewUrl = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      imagePreview: previewUrl,
    }));

    try {
      // 2️⃣ Upload to Cloudinary
      const uploadedImageUrl = await uploadImageToCloudinary(file);

      // 3️⃣ Save Cloudinary URL in form data
      setFormData((prev) => ({
        ...prev,
        imageUrl: uploadedImageUrl,
      }));
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMemberdata(formData, formData.domain, formData.position)
      .then((res) => {
        if (res.success) {
          alert("Member added successfully!");
          console.log(formData);
          
        } else {
          alert("Error adding member: " + res.error);
        }
      })
      .catch((err) => {
        console.error("Error adding member:", err);
        alert("Error adding member: " + err.message);
      });
  };

  return (
    <div className={classes.page}>
      <div className={classes.bgOverlay}>
        <div className={classes.blob1} />
        <div className={classes.blob2} />
        <div className={classes.blob3} />
      </div>

      <div className={classes.wrapper}>
        <div className={classes.card}>
          <form onSubmit={handleSubmit}>
            <div className={classes.imageSection}>
              <div className={classes.imageBox}>
                {formData.imagePreview ? (
                  <img src={formData.imagePreview} alt="Preview" />
                ) : (
                  <HiCamera size={40} color="#94a3b8" />
                )}
              </div>

              <label className={classes.uploadLabel}>
                <HiCamera /> Choose Profile Image
                <input type="file" hidden onChange={handleImageChange} />
              </label>
            </div>

            <div className={classes.formGrid}>
              <div className={classes.field}>
                <label>
                  <HiUser /> Full Name
                </label>
                <input name="name" onChange={handleChange} />
              </div>

              <div className={classes.field}>
                <label>
                  <HiUserGroup /> Position
                </label>
                <select
                  name="position"
                  className={classes.select}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value={"president"}>President</option>
                  <option value={"lead"}>Lead</option>
                  <option value={"coor"}>Coordinator</option>
                </select>
              </div>

              <div className={classes.field}>
                <label className={classes.domainLabel}>
                  <span className={classes.domainBadge}>AI</span>
                  Domain *
                </label>

                <select
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  className={classes.select}
                >
                  <option value="">Select your domain</option>
                  <option value="cloud">Cloud</option>
                  <option value="web">Web Development</option>
                  <option value="aiml">AI / ML</option>
                  <option value="dsa">DSA & Competitive Programming</option>
                  <option value="management">Management</option>
                  <option value="docs">Documentation</option>
                  <option value="android">Android</option>
                  <option value="cs">Cyber Security</option>
                  <option value="Design">Design</option>
                  <option value="pr">PR & Marketing</option>
                  <option value="media">Media</option>
                </select>
              </div>

              <div className={classes.field}>
                <label>
                  <HiLink /> Instagram
                </label>
                <input name="instagram" onChange={handleChange} />
              </div>

              <div className={classes.field}>
                <label>
                  <HiLink /> LinkedIn
                </label>
                <input name="linkedin" onChange={handleChange} />
              </div>

              <div className={classes.field}>
                <label>
                  <HiCode /> GitHub
                </label>
                <input name="github" onChange={handleChange} />
              </div>
            </div>

            <button className={classes.submit}>🚀 Submit Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMember;
