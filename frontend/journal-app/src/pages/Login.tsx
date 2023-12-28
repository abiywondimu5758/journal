// src/pages/Login.tsx
import React, { useRef } from "react";
import { useLogin } from "../queries";
import { useNavigate } from 'react-router-dom';
// import useDebounce from 'use-debounce';

const Login: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const {  loginMutation, isLoggedIn } = useLogin();
  React.useEffect(() => {
    // Check the condition and redirect if necessary
    if (isLoggedIn) {
      navigate('/entries');
    }
  }, [isLoggedIn, navigate]);
  const handleLogin = () => {
    // Access the input values using refs
    const usernameValue = usernameRef.current?.value || "";
    const passwordValue = passwordRef.current?.value || "";

    // Call the useLogin mutation with the provided credentials
    loginMutation.mutate({ username: usernameValue, password: passwordValue });
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" ref={usernameRef} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" ref={passwordRef} />
        </div>
        <div>
          <button type="button" onClick={handleLogin} disabled={loginMutation.isLoading}>
            {loginMutation.isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
        {loginMutation.isError && <div>Error logging in</div>}
        {isLoggedIn && <div>Already logged in</div>}
      </form>
    </div>
  );
};

export default Login;
