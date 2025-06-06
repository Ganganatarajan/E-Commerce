import React, { useState } from "react";
import { login } from "../Services/Login";
import { message } from "antd";

const rotateAnimation = {
  animation: "spin 6s linear infinite",
};

const reverseRotateAnimation = {
  animation: "spin 6s linear infinite reverse",
};

const LoginForm = () => {
  const [formData, setFormData] = useState({
    mailId: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const credentials = {
        mailId: formData.mailId,
        password: formData.password,
      };

      await login(credentials);

      // Success message will be shown by the interceptor
      // Redirect to dashboard or home page
      window.location.href = "/PremiumAds";
    } catch (error) {
      // Error is already handled by the interceptor
      // You can add additional error handling here if needed
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 font-[Poppins] p-4">
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      <div className="relative w-[370px] max-w-md h-[480px] rounded-2xl overflow-hidden shadow-xl">
        <div
          className="absolute top-[-50%] left-[-50%] w-[370%] h-[450px] bg-gradient-to-tr from-transparent via-[#4f46e5] to-[#4f46e5] origin-bottom-right z-0"
          style={rotateAnimation}
        />
        <div
          className="absolute top-[-50%] left-[-50%] w-[370%] h-[450px] bg-gradient-to-tr from-transparent via-[#ec4899] to-[#ec4899] origin-bottom-right z-0"
          style={reverseRotateAnimation}
        />

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="absolute inset-[2px] bg-white rounded-2xl p-6 sm:p-8 z-10 flex flex-col justify-center"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Welcome Back
            </h1>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Sign in to your account
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Mail Id
              </label>
              <input
                id="mailId"
                name="mailId"
                type="text"
                placeholder="Enter your mailId"
                value={formData.mailId}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 text-gray-600">
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-medium py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
