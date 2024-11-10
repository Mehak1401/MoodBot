import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';
import './register.css'; // Import CSS file for styling

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { userLoggedIn } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      await doCreateUserWithEmailAndPassword(email, password);
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={'/home'} replace={true} />}

      <main className="register-main w-full h-screen flex items-center justify-center">
        <div className="glassmorphic-container animate-float space-y-5 p-8 shadow-lg border rounded-xl">
          <div className="text-center mb-6 animate-fade-in-down">
            <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">
              Create a New Account
            </h3>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="animate-slide-in">
              <label className="text-sm text-gray-600 font-bold">Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="input-field"
              />
            </div>

            <div className="animate-slide-in" style={{ animationDelay: '0.1s' }}>
              <label className="text-sm text-gray-600 font-bold">Password</label>
              <input
                disabled={isRegistering}
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="input-field"
              />
            </div>

            <div className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
              <label className="text-sm text-gray-600 font-bold">Confirm Password</label>
              <input
                disabled={isRegistering}
                type="password"
                autoComplete="off"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setconfirmPassword(e.target.value);
                }}
                className="input-field"
              />
            </div>

            {errorMessage && (
              <span className="text-red-600 font-bold animate-fade-in">
                {errorMessage}
              </span>
            )}

            <button
              type="submit"
              disabled={isRegistering}
              className={`submit-button animate-hover ${
                isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600'
              }`}
            >
              {isRegistering ? 'Signing Up...' : 'Sign Up'}
            </button>
            <div className="text-sm text-center">
              Already have an account?{' '}
              <Link to={'/login'} className="font-bold underline">
                Continue
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Register;
