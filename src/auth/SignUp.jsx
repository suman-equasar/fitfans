import React from "react";
import logo from "../assets/Logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const [errors, setErrors] = React.useState({});

  const validate = () => {
    const newErrors = {};

    if (!/^[A-Za-z\s]{2,20}$/.test(formData.name)) {
      newErrors.name = "Name should be 2-20 letters only";
    }

    if (!/^[a-zA-Z0-9_]{3,20}$/.test(formData.username)) {
      newErrors.username =
        "Username must be 3-20 characters (letters, numbers, underscores)";
    }

    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Invalid email format (e.g. user@example.com)";
    }

    if (
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/.test(formData.password)
    ) {
      newErrors.password =
        "Password must be at least 8 characters with letters and numbers";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Form submitted:", formData);
      // Reset or send to API here
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(formData);
      localStorage.setItem("users", JSON.stringify(users));
      console.log("Data saved to localStorage:", users);
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      alert("Sign Up Successful! Data saved to localStorage.");
      navigate("/login");
    }
  };
  return (
    <section className="bg-black min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full border-[#FFFFFF33] border-[1px] rounded-[2.5rem] max-w-md bg-black px-6 py-8 sm:px-8 sm:py-10 shadow-lg bg-opacity-90">
        <div className="flex justify-center mb-6 sm:mb-8">
          <img
            src={logo}
            alt="logo"
            className="w-20 h-20 sm:w-28 sm:h-28 mr-2"
          />
        </div>

        <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 sm:py-4 rounded-md text-sm 
              text-[#707070] bg-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 sm:py-4 rounded-md text-sm text-[#707070] bg-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 sm:py-4 rounded-md text-sm text-[#707070] bg-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 sm:py-4 rounded-md text-sm text-[#707070] bg-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer text-lg"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 sm:py-4 rounded-md text-sm text-[#707070] bg-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#08C7BF] hover:bg-teal-500 text-white py-3 sm:py-4 font-productsans rounded-md font-medium transition-all"
          >
            login
          </button>

          {/* Google Login */}
          <div className="flex items-center justify-center mt-4">
            <button
              type="button"
              className="flex items-center space-x-2 text-white px-4 py-2 rounded-md hover:bg-teal-500 transition-all"
              onClick={() =>
                (window.location.href = "http://localhost:3000/api/auth/google")
              }
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span>Login with Google</span>
            </button>
          </div>

          {/* Bottom link */}
          <p className="text-center text-sm text-white mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline text-white font-medium transition-all"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};
export default SignUp;
