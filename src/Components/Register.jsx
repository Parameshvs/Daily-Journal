import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios'; // Correct import of axios instance
import '../styles/Register.css';

const Register = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '', terms: false });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggleMode = () => {
    setError('');
    setForm({ name: '', email: '', password: '', terms: false });
    setIsRegister(!isRegister);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password || (isRegister && (!form.name || !form.terms))) {
      return setError('Please fill all required fields');
    }

    try {
      if (isRegister) {
        // Registration request
        await API.post('auth/register', {
          name: form.name,
          email: form.email,
          password: form.password,
        });
        navigate('/login');
      } else {
        // Login request
        const response = await API.post('auth/login', {
          email: form.email,
          password: form.password,
        });

        if (response.data && response.data.token) {
          localStorage.setItem('authToken', response.data.token); // Store token in localStorage
          navigate('/dashboard'); // Redirect to dashboard
        } else {
          setError('Login failed. No token received.');
        }
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError('Authentication failed. Try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>{isRegister ? 'Register with' : 'Login with'}</h2>

        <div className="social-buttons">
          <button className="social-btn">f</button>
          <button className="social-btn"></button>
          <button className="social-btn">G</button>
        </div>

        <div className="divider"><span>or</span></div>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
          )}
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />

          {isRegister && (
            <label className="terms">
              <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} />
              I agree to the <span className="bold">Terms and Conditions</span>
            </label>
          )}

          <button type="submit" className="submit-btn">
            {isRegister ? 'SIGN UP' : 'LOGIN'}
          </button>

          {error && <p className="error">{error}</p>}
        </form>

        <p className="toggle-link">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span onClick={toggleMode}>{isRegister ? 'Sign in' : 'Sign up'}</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
