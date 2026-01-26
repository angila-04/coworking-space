import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./authentication.css";
import { registerUser, loginUser } from "../api/authApi"; // make sure these call your FastAPI endpoints

export default function Authentication() {
  const [mode, setMode] = useState("register"); // "register" or "login"
  const [role, setRole] = useState("user");     // "user" or "provider"
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <h1>{mode === "register" ? "Registration" : "Login"}</h1>

      {/* Mode toggle */}
      <div className="auth-toggle">
        <button onClick={() => setMode("register")}>Register</button>
        <button onClick={() => setMode("login")}>Login</button>
      </div>

      {/* Role toggle only in register */}
      {mode === "register" && (
        <div className="auth-toggle">
          <button onClick={() => setRole("user")}>User</button>
          <button onClick={() => setRole("provider")}>Service Provider</button>
        </div>
      )}

      {/* Render the correct form */}
      {mode === "login" ? (
        <LoginForm navigate={navigate} />
      ) : role === "user" ? (
        <UserForm navigate={navigate} />
      ) : (
        <ProviderForm navigate={navigate} />
      )}
    </div>
  );
}

/* ================= USER REGISTER ================= */
function UserForm({ navigate }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await registerUser({
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        password: form.password,
        role: "user",
      });
      alert("User registered successfully ✅");
      navigate("/login"); // redirect to login
    } catch (err) {
      alert(err.response?.data?.detail || "Registration failed ❌");
    }
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

/* ================= SERVICE PROVIDER REGISTER ================= */
function ProviderForm({ navigate }) {
  const [form, setForm] = useState({
    ownerName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await registerUser({
        name: form.ownerName,
        email: form.email,
        mobile: form.mobile,
        password: form.password,
        role: "service_provider",
      });
      alert("Service provider registered ✅");
      navigate("/login"); // redirect to login
    } catch (err) {
      alert(err.response?.data?.detail || "Registration failed ❌");
    }
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
function LoginForm({ navigate }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);

      const { id, name, role } = res.data;

      // ✅ Store auth info
      localStorage.setItem("userId", id);
      localStorage.setItem("role", role);
      localStorage.setItem("name", name);

      // ✅ Role-based redirect
      if (role === "admin") {
        navigate("/admin/dashboard");
      }
      else if (role === "service_provider") {
        navigate(`/service-provider/${id}/dashboard`);
      }
      else {
        // 👤 USER
        navigate(`/user/${id}/dashboard`);
      }

    } catch (err) {
      alert("Invalid email or password ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h3>Login</h3>
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
}
