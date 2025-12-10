import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/auth-shared.css";

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/user/login",
        formData,
        {
          withCredentials: true,
        }
      );

      // ✅ FIX: Save the real user data to LocalStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Force reload to update App.jsx state immediately
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <header>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Login to access your feed</p>
        </header>

        {error && (
          <div className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded">
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="field-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="auth-submit">
            Log In
          </button>
        </form>

        <div className="auth-alt-action">
          Don't have an account? <Link to="/register">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
