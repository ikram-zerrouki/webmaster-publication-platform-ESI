import React, { useState } from 'react';
import axios from 'axios';
import Login from '../images/Login.png';

import { useNavigate } from 'react-router-dom';
import '../App.css';

const LoginP = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  const [loginError, setLoginError] = useState('');

  
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/users/login/', {
        email: username,
        password: password,
      });
  
      const { token, user } = response.data;
  
      // Stockage du token si besoin
      localStorage.setItem('access_token', token.access);
      localStorage.setItem('refresh_token', token.refresh);
      localStorage.setItem('user_role', user.role);
  
      // Redirection selon le rôle
      switch (user.role) {
        case 'admin':
          navigate('/HomePage');
          break;
        case 'editeur':
          navigate('/HomePageEditeur');
          break;
        case 'redacteur':
          navigate('/home');
          break;
        default:
          navigate('/home');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error.response?.data || error.message);
      setLoginError('Email ou mot de passe incorrect');
    }
    
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleButtonActive = () => {
    setButtonActive(true);
    setTimeout(() => setButtonActive(false), 100);
  };

  return (
    <div
      className="container"
      style={{
        backgroundColor: '#E1EBF6',
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Left Side - Image */}
      
      <div className="left" style={{ flex: 1 }}>
        <div
          className="full-screen-image"
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src={Login}
            alt="Login Illustration"
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
        </div>
      </div>

      {/* Right Side - Form */}
      
      <div className="right" style={{ flex: 1, position: 'relative',display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', }}>
   

   
        <div
        
          style={{
            backgroundColor: '#AFD4FD',
            padding: '40px',
            borderRadius: '30px',
            width: '500px',
            margin: '40px auto',
            color: '#0047AB',
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            <label>Email</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                height: '35px',
                fontSize: '16px',
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                backgroundColor: '#E1EBF6',
                outline: 'none',
                marginTop: '5px',
              }}
            />
          </div>

          <div style={{ marginBottom: '20px', position: 'relative' }}>
            <label>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                height: '35px',
                fontSize: '16px',
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                backgroundColor: '#E1EBF6',
                outline: 'none',
                marginTop: '5px',
              }}
            />
            <button
              type="button"
              onClick={handleTogglePassword}
              style={{
                position: 'absolute',
                right: '10px',
                top: '35px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#002366',
                fontWeight: 'bold',
              }}
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {/* {showPassword ? 'Hide' : 'Show'} */}
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
  <button
    type="button"
    onClick={() => {
      handleLogin();
      handleButtonActive();
    }}
    style={{
      width: '60%',
      maxWidth: '420px', // match with form padding and input widths
      height: '40px',
      fontSize: '16px',
      padding: '8px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: buttonActive ? '#0047AB' : '#002366',
      outline: 'none',
      cursor: 'pointer',
      color: '#FFFFFF',
      fontWeight: 'bold',
      transition: 'background-color 0.2s ease',
    }}
  >
    Sign In
  </button>
  {loginError && (
  <div style={{ color: 'red', marginTop: '20px', textAlign: 'center' }}>
    {loginError}
  </div>
)}

</div>

        </div>
      </div>
    </div>
  );
};

export default LoginP;




