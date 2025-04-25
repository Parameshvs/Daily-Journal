// import React, { useState } from 'react';
// import API from '../api/axios'; // Correct import of axios instance
// import { useNavigate } from 'react-router-dom';
// import '../styles/Login.css';

// const Login = () => {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   // Handle input changes
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Make the POST request to login
//       const response = await API.post('auth/login', form);

//       // Ensure the token is in the response
//       if (response.data && response.data.token) {
//         const token = response.data.token;
//         console.log('Token received:', token); // Debugging line
//         localStorage.setItem('authToken', token); // Store token in localStorage
//         navigate('/dashboard'); // Redirect to the dashboard
//       } else {
//         // If token doesn't exist in response
//         setError('Login failed. No token received.');
//       }
//     } catch (err) {
//       console.error('Login failed:', err);
//       setError(err.response?.data?.message || 'Invalid email or password. Try again.'); // Show error message on failure
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="register-box">
//         <h2>Welcome back 👋</h2>
//         <p className="sub-text">Please enter your login details</p>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             required
//           />
//           <button className="login-btn" type="submit">
//             Login
//           </button>
//           {error && <p className="error-text">{error}</p>}
//         </form>

//         {/* Social login buttons */}
//         <button className="apple-btn">
//           <img src="/apple-logo.png" alt="Apple" width="18" />
//           Continue with Apple
//         </button>
//         <button className="google-btn">
//           <img src="/google-logo.png" alt="Google" width="18" />
//           Continue with Google
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;
// src/Components/Login.js

import React, { useState } from 'react';
import API from '../api/axios'; // Correct import of axios instance
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [form, setForm] = useState({ emailsss: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the POST request to login
      const response = await API.post('auth/login', form);

      // Ensure the token is in the response
      if (response.data && response.data.token) {
        const token = response.data.token;
        console.log('Token received:', token); // Debugging line
        localStorage.setItem('authToken', token); // Store token in localStorage
        navigate('/dashboard'); // Redirect to the dashboard
      } else {
        // If token doesn't exist in response
        setError('Login failed. No token received.');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.response?.data?.message || 'Invalid email or password. Try again.'); // Show error message on failure
    }
  };

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

        {/* Social login buttons */}
        <button className="apple-btn">
          <img src="/apple-logo.png" alt="Apple" width="18" />
          Continue with Apple
        </button>
        <button className="google-btn">
          <img src="/google-logo.png" alt="Google" width="18" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
