import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/auth-shared.css"; // Ensure this path is correct

const UserRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "candidate", // Default role
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(
        `${import.meta.env.BACKEND}/api/auth/user/register`,
        formData,
        {
          withCredentials: true,
        }
      );
      // Redirect to login or home after successful register
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <header>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">
            Join HireFeed to find your next opportunity
          </p>
        </header>

        {error && (
          <div className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded">
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Role Toggle */}
          <div className="flex bg-gray-100 p-1 rounded-lg mb-2">
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                formData.role === "candidate"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setFormData({ ...formData, role: "candidate" })}
            >
              Job Seeker
            </button>
            <button
              type="button"
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                formData.role === "recruiter"
                  ? "bg-white text-purple-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setFormData({ ...formData, role: "recruiter" })}
            >
              Recruiter
            </button>
          </div>

          <div className="field-group">
            <label>Full Name</label>
            <input
              type="text"
              name="username"
              placeholder="e.g. Alex Johnson"
              required
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="field-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="name@company.com"
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
            Sign Up
          </button>
        </form>

        <div className="auth-alt-action">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
