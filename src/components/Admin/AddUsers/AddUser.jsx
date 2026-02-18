import React, { useState } from "react";
import classes from "./AddUser.module.css";
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth";
import { createUserDocument } from "../../../SetData/setUsersData";

const AddUser = ({ uid }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nickname: "",
    uid: uid || "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await doCreateUserWithEmailAndPassword(
        formData.email,
        formData.password
      );

      const userId = data.user.uid;

      await createUserDocument({
        uid: userId,
        name: formData.nickname,
        email: formData.email,
        imgurl: "image url will be here",
        role: formData.role, // 👈 role added
        createdAt: new Date(),
      });

      alert("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
      alert(error.message);
    }
  };

  return (
    <div className={classes.container}>
      <form className={classes.card} onSubmit={handleSubmit}>
        <h2 className={classes.title}>Create User Profile</h2>

        {/* Profile Image */}
        <div className={classes.imageUpload}>
          <label htmlFor="profilePic">
            <div className={classes.imageCircle}>
              {preview ? (
                <img src={preview} alt="Preview" />
              ) : (
                <span>Upload Image</span>
              )}
            </div>
          </label>
          <input
            type="file"
            id="profilePic"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
        </div>

        {/* Email */}
        <div className={classes.row}>
          <div className={classes.field}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={classes.field}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Nickname */}
        <div className={classes.row}>
          <div className={classes.field}>
            <label>Nickname</label>
            <input
              type="text"
              name="nickname"
              placeholder="Enter nickname"
              value={formData.nickname}
              onChange={handleChange}
              required
            />
          </div>

          <div className={classes.row}>
            <div className={classes.field}>
              <label>Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="president">President</option>
                <option value="lead">Lead</option>
                <option value="coordinator">Coordinator</option>
              </select>
            </div>
          </div>

          
        </div>

        <button type="submit" className={classes.submit}>
          Create User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
