import React, { useState } from "react";
import { Link } from "react-router-dom";
import netflixLogo from "../../assets/netflix-logo.png";
import "./SignUp.css";

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      userName: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    console.log("Form Data:", formData);

    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      console.log("Response from backend:", data);

      if (response.ok) {
          toast.success("Sign Up Successful. Please log in to continue.");
      } else {
        console.log("Error:", data.message);
        toast.error(`Sign up failed. ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"}>
          <img src={netflixLogo} alt="logo" className="w-52" />
        </Link>
      </header>
      <div className="flex justify-center items-center mt-20 mx-auto">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4">
            Sign Up
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit} method="POST">
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300 block"
              >
                Email
              </label>
              <input
                type="email"
                name=""
                id="email"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none foucs:ring"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-300 block"
              >
                User name
              </label>
              <input
                type="text"
                name=""
                id="username"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none foucs:ring"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300 block"
              >
                Password
              </label>
              <input
                type="password"
                name=""
                id="password"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none foucs:ring"
                placeholder="********"
              />
            </div>

            <button
              className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
              type="submit"
              disabled={loading}
            >
              {loading ? "Processing..." : " Sign Up"}
            </button>
          </form>
          <div className="text-center text-gray-400">
            Already a member?{" "}
            <Link to={"/login"} className="text-red-500 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
