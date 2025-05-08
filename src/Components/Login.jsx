
import React, { useState } from 'react';
import API from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css'; // Import your styles

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false); // for loader
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true) // show loader when login starts

    try {
      const response = await API.post('auth/login', form)

      if (response.data && response.data.token) {
        localStorage.setItem('authToken', response.data.token)
        localStorage.setItem('role', response.data.role); // Save role as well

        // wait 2 seconds, then navigate
        setTimeout(() => {
          if (response.data.role === 'ADMIN') {
            navigate('/admin') // Redirect to admin dashboard if role is ADMIN
          } else {
            navigate('/dashboard')// Redirect to user dashboard if role is USER
          }
        }, 2000)
      } else {
        setLoading(false)
        setError('Login failed. No token received.')
      }

    } catch (err) {
      console.error('Login failed:', err)

      setLoading(false)
      setError(err.response?.data?.message || 'Invalid email or password.')
    }
  }

  if (loading) {
    return (
      <div className="login-loader-wrapper">
        <aside className="container-loader">
        <div style={{ "--s": "0" }} className="aro"></div>
        <div style={{ "--s": "1" }} className="aro"></div>
          <div style={{ "--s": "2" }} className="aro"></div>
        <div style={{ "--s": "3" }} className="aro"></div>
        <div style={{ "--s": "4" }} className="aro"></div>
        <div style={{ "--s": "5" }} className="aro"></div>
      <div style={{ "--s": "6" }} className="aro"></div>
        <div style={{ "--s": "7" }} className="aro"></div>
        <div style={{ "--s": "8" }} className="aro"></div>
        <div style={{ "--s": "9" }} className="aro"></div>
      <div style={{ "--s": "10" }} className="aro"></div>
      <div style={{ "--s": "11" }} className="aro"></div>
      <div style={{ "--s": "12" }} className="aro"></div>
      <div style={{ "--s": "13" }} className="aro"></div>
      <div style={{ "--s": "14" }} className="aro"></div>
          <div style={{ "--s": "15" }} className="aro"></div>
        </aside>
      </div>
    )
  }

  return (
    <div className="login-container">
      <div className="register-box">
        <h2>Welcome back 👋</h2>
        <p className="sub-text">Please enter your login details</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button className="login-btn" type="submit">
            Login
          </button>
          {error && <p className="error-text">{error}</p>}
        </form>

        <p className="toggle-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
