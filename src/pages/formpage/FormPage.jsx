import { useState } from "react";
import "./form.css";
import { Form, useNavigate } from "react-router-dom";
import { useUserData } from "../../context/UserContext";

const FormPage = () => {
  const navigate = useNavigate();
  const { setUserData } = useUserData();

  const [userData, localSetUserData] = useState({
    name: "",
    photo: null,
    techStack: "",
    email: "",
    phone: "",
    group: "",
  });

  const [errors, setErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    localSetUserData({
      ...userData,
      [name]: value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match("image.*")) {
        setErrors({ ...errors, photo: "Please upload an image file" });
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setErrors({ ...errors, photo: "File size should be less than 2MB" });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        localSetUserData({
          ...userData,
          photo: file,
        });
        setErrors({ ...errors, photo: "" });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!userData.name.trim()) newErrors.name = "Name is required";
    if (!userData.photo) newErrors.photo = "Photo is required";
    if (!userData.techStack.trim())
      newErrors.techStack = "Tech stack is required";
    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!userData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(userData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!userData.group.trim()) newErrors.group = "Group is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // updating global userData state
      setUserData(userData);
      navigate("/choose-template");
    }
  };

  return (
    <div className="form-container">
      <h2>Member Info</h2>
      <form
        onSubmit={handleSubmit}
        className="id-card-form"
      >
        {/* Name Field */}
        <div className={`form-group ${errors.name ? "error" : ""}`}>
          <label htmlFor="name">Full Name*</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        {/* Photo Upload */}
        <div className={`form-group ${errors.photo ? "error" : ""}`}>
          <label
            htmlFor="photo"
            className="upload-label"
          >
            {photoPreview ? (
              <div className="image-preview">
                <img
                  src={photoPreview}
                  alt="Preview"
                />
                <span className="change-text">Change Image</span>
              </div>
            ) : (
              <>
                <div className="upload-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 13V19H5V13H3V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V13H19ZM13 5V16H11V5H8L12 1L16 5H13Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="upload-text">
                  <p className="main-text">Upload your photo</p>
                  <p className="sub-text">PNG or JPG (max. 2MB)</p>
                </div>
              </>
            )}
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden-input"
          />

          {errors.photo && (
            <span className="error-message">{errors.photo}</span>
          )}
        </div>

        {/* Tech Stack */}
        <div className={`form-group ${errors.techStack ? "error" : ""}`}>
          <label htmlFor="techStack">Tech Stack*</label>
          <input
            type="text"
            id="techStack"
            name="techStack"
            value={userData.techStack}
            onChange={handleChange}
            placeholder="e.g., Frontend, AI/ML, DevOps"
          />
          {errors.techStack && (
            <span className="error-message">{errors.techStack}</span>
          )}
        </div>

        {/* Email */}
        <div className={`form-group ${errors.email ? "error" : ""}`}>
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        {/* Phone */}
        <div className={`form-group ${errors.phone ? "error" : ""}`}>
          <label htmlFor="phone">Phone Number*</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <span className="error-message">{errors.phone}</span>
          )}
        </div>

        {/* Group */}
        <div className={`form-group ${errors.group ? "error" : ""}`}>
          <label htmlFor="group">Group/Team*</label>
          <select
            id="group"
            name="group"
            value={userData.group}
            onChange={handleChange}
          >
            <option value="">Select your group</option>
            <option value="Regular">Regular</option>
            <option value="Special">Special</option>
            {/* <option value="DevOps">DevOps</option>
            <option value="Design">Design</option>
            <option value="Product">Product</option> */}
          </select>
          {errors.group && (
            <span className="error-message">{errors.group}</span>
          )}
        </div>

        <button
          type="submit"
          className="submit-btn"
        >
          Generate Card
        </button>
      </form>
    </div>
  );
};

export default FormPage;
