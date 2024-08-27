import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import "../styles/ProfilePage.scss";
const ProfilePage = () => {
  const [loading, setLoading] = useState(false)
  const user = useSelector((state) => state.user);
  console.log(user);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    confirmPassword: user.confirmPassword,
    profileImage: null,
  });
  const [passwordMatch, setPasswordMatch] = useState(true)

  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword);
  }, [formData.password, formData.confirmPassword]);



  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const register_form = new FormData()

      for (var key in formData) {
        register_form.append(key, formData[key])
      }

      const response = await fetch(`http://localhost:3001/users/${user._id}/update`, {
        method: "PUT",
        body: register_form
      })



    } catch (err) {
      console.log("update failed", err.message)
    }
  }




  return loading ? <Loader /> : (
    <>
      <Navbar />
      <div className="profile-container">
        
        <img
          src={`http://localhost:3001/${user.profileImagePath.replace(
            "public",
            ""
          )}`}
          alt="profile photo"
          className="profile-image"
        />

        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            required
          />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            required
          />

          {!passwordMatch && (<p className="password-mismatch">Passwords are not matched!</p>
          )}

          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChange}
            required
          />
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add profile_im" />
            <p>Upload Your New photo</p>
          </label>

          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile_im"
              className="preview-image"
            />
          )}
          <button type="submit" disabled={!passwordMatch}>
            update
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
