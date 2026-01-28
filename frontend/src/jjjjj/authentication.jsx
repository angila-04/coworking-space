
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './authentication.css';

// ─── Google Auth Button ──────────────────────────────────────────────────
function GoogleAuthSection({ mode, onSuccess, onError }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!window.google?.accounts?.id) return;

    window.google.accounts.id.initialize({
      client_id: '926854179063-ptq6bfh4hve550bno82j0kskcecops13.apps.googleusercontent.com',
      callback: (response) => {
        if (response.credential) {
          onSuccess(response);
        } else {
          onError?.();
        }
      },
      auto_select: false,
    });

    window.google.accounts.id.renderButton(buttonRef.current, {
      theme: 'filled_black',
      size: 'large',
      text: mode === 'register' ? 'signup_with' : 'signin_with',
      shape: 'rectangular',
      width: 320,
    });
  }, [mode, onSuccess, onError]);

  return (
    <div className="google-section">
      <p>{mode === 'register' ? 'Sign up with Google' : 'Login with Google'}</p>
      <div ref={buttonRef} className="google-button-wrapper" />
    </div>
  );
}

// ─── User Registration Form ──────────────────────────────────────────────
function UserRegistrationForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      alert('Email and password are required');
      return;
    }
    console.log('Manual user registration:', form);
    // TODO: POST to /api/register/user
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="manual-form">
      <h3>Register with Email</h3>
      <input
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="mobile"
        placeholder="Mobile Number"
        value={form.mobile}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Register as User</button>
    </form>
  );
}

// ─── Provider Registration Form (without service type) ───────────────────
function ProviderRegistrationForm({ onSuccess }) {
  const [form, setForm] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      alert('Email and password are required');
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Manual provider registration:', form);
    // TODO: POST to /api/register/provider
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="manual-form">
      <h3>Register as Service Provider</h3>
      <input
        name="businessName"
        placeholder="Business / Company Name *"
        value={form.businessName}
        onChange={handleChange}
        required
      />
      <input
        name="ownerName"
        placeholder="Owner / Contact Person Name *"
        value={form.ownerName}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Business Email *"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="mobile"
        placeholder="Mobile Number"
        value={form.mobile}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password *"
        value={form.password}
        onChange={handleChange}
        required
      />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password *"
        value={form.confirmPassword}
        onChange={handleChange}
        required
      />
      <button type="submit">Register as Provider</button>
    </form>
  );
}

// ─── Login Form ──────────────────────────────────────────────────────────
function LoginForm({ onSuccess }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      alert('Email and password are required');
      return;
    }
    console.log('Manual login:', form);
    // TODO: POST to /api/login
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="manual-form">
      <h3>Login with Email</h3>
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

// ─── MAIN AUTHENTICATION COMPONENT ───────────────────────────────────────
export default function Authentication() {
  const [mode, setMode] = useState('register');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleGoogleSuccess = (response) => {
    console.log('Google ID Token:', response.credential);
    // TODO: send to backend → verify + create/get session
    navigate('/admin');
  };

  const handleGoogleError = () => {
    alert('Google authentication failed.');
  };

  const handleManualSuccess = () => {
    navigate('/admin'); // later: /provider-dashboard etc.
  };

  return (
    <div className="auth-container">
      <h1>{mode === 'register' ? 'Registration' : 'Login'}</h1>

      {/* Mode toggle */}
      <div className="toggle-group mode-toggle">
        <button
          className={`toggle-btn ${mode === 'register' ? 'active' : ''}`}
          onClick={() => setMode('register')}
        >
          Register
        </button>
        <button
          className={`toggle-btn ${mode === 'login' ? 'active' : ''}`}
          onClick={() => setMode('login')}
        >
          Login
        </button>
      </div>

      {/* Role toggle – only shown in register mode */}
      {mode === 'register' && (
        <div className="toggle-group role-toggle">
          <button
            className={`toggle-btn ${role === 'user' ? 'active' : ''}`}
            onClick={() => setRole('user')}
          >
            As User
          </button>
          <button
            className={`toggle-btn ${role === 'provider' ? 'active' : ''}`}
            onClick={() => setRole('provider')}
          >
            As Service Provider
          </button>
        </div>
      )}

      {/* Google sign-in/up */}
      <GoogleAuthSection
        mode={mode}
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
      />

      {/* Manual form – always visible when in register or login */}
      {mode === 'register' ? (
        role === 'user' ? (
          <UserRegistrationForm onSuccess={handleManualSuccess} />
        ) : (
          <ProviderRegistrationForm onSuccess={handleManualSuccess} />
        )
      ) : (
        <LoginForm onSuccess={handleManualSuccess} />
      )}

      {/* Cross links */}
      {mode === 'register' && (
        <p className="small-note">
          Already have an account?{' '}
          <button className="link-btn" onClick={() => setMode('login')}>
            Login here
          </button>
        </p>
      )}
      {mode === 'login' && (
        <p className="small-note">
          Don't have an account?{' '}
          <button className="link-btn" onClick={() => setMode('register')}>
            Register here
          </button>
        </p>
      )}
    </div>
  );
}
