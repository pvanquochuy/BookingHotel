import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../utils/ApiFunctions";
function LoginPage() {
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { email, password } = formData;
    return email && password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setErrorMessage("Please fill in all fields.");
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }

    try {
      const response = await loginUser(formData.email, formData.password);
      if (response && response.token && response.role) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.role);
        setSuccessMessage("Login successful!");

        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  return (
    <div className="auth-container">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <p className="register-link">
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
}

export default LoginPage;
