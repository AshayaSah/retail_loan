import { useFrappeAuth } from "frappe-react-sdk";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthProviderCopy = () => {
  const {
    currentUser,
    isValidating,
    isLoading,
    login,
    logout,
    error: authError,
    updateCurrentUser,
    getUserCookie,
  } = useFrappeAuth();

  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  if (isLoading) return <div className="text-center">Loading...</div>;

  const handleLogin = async () => {
    setLoginError(""); // Reset any previous error
    try {
      // const userEmail = "ashaysah@gmail.com";
      // const userPassword = "ashay2059";
      // if (!userEmail || !userPassword) {
      //   setLoginError("Email and password are required.");
      //   return;
      // }

      // await login({
      //   usr: "ashaysah@gmail.com",
      //   pwd: "ashay2059",
      // });
      // console.log("Login successful");

      const response = await fetch("http://192.168.10.41/api/method/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usr: "ashish@cas.com.np",
          pwd: "P@ssw0rd@123",
        }),
        credentials: "include", // Include cookies for cross-origin requests
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);

      // Handle various error scenarios
      setLoginError(
        err.message ||
          (err.httpStatus === 401
            ? "Incorrect username or password."
            : "An error occurred during login.")
      );
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logout successful");
    } catch (err) {
      console.error("Logout error:", err);
      setLoginError("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-lg font-semibold mb-4">
        Current User: {currentUser ? currentUser.name : "Not logged in"}
      </h2>
      {loginError && <p className="text-red-500 mb-4">{loginError}</p>}
      <div className="space-y-2">
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
        <button
          onClick={updateCurrentUser}
          className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 transition duration-200"
        >
          Fetch Current User
        </button>
      </div>
    </div>
  );
};

export default AuthProviderCopy;
