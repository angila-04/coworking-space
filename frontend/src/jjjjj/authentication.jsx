import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./authentication.css";

export default function Authentication() {
  const [mode, setMode] = useState("register");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <h1>{mode === "register" ? "Registration" : "Login"}</h1>

      <div className="auth-toggle">
        <button onClick={() => setMode("register")}>Register</button>
        <button onClick={() => setMode("login")}>Login</button>
      </div>

      {mode === "register" && (
        <div className="auth-toggle">
          <button onClick={() => setRole("user")}>User</button>
          <button onClick={() => setRole("provider")}>Service Provider</button>
        </div>
      )}

      {mode === "login" ? (
        <LoginForm onSuccess={() => navigate("/admin")} />
      ) : role === "user" ? (
        <UserForm onSuccess={() => navigate("/admin")} />
      ) : (
        <ProviderForm onSuccess={() => navigate("/admin")} />
      )}
    </div>
  );
}

/* ================= USER REGISTER ================= */
function UserForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Register:", form);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h3>User Registration</h3>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="mobile" placeholder="Mobile Number" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        onChange={handleChange}
      />

      <button type="submit">Register</button>
    </form>
  );
}

/* ================= PROVIDER REGISTER (NO FILE UPLOAD) ================= */
function ProviderForm({ onSuccess }) {
  const [form, setForm] = useState({
    ownerName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Provider Register:", form);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h3>Service Provider Registration</h3>

      <input name="ownerName" placeholder="Owner Name" onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="mobile" placeholder="Mobile Number" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        onChange={handleChange}
      />

      <button type="submit">Register</button>
    </form>
  );
}

/* ================= LOGIN ================= */
function LoginForm({ onSuccess }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", form);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h3>Login</h3>

      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />

      <button type="submit">Login</button>
    </form>
  );
}

