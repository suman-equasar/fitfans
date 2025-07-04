import React from "react";
import { FcGoogle } from "react-icons/fc";
import logo from "../assets/Logo.svg";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = React.useState({
    identifier: "", // phone, email, or username
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState({});
  const [showModal, setShowModal] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Regex patterns
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  const phoneRegex = /^[0-9]{10}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    const identifier = formData.identifier.trim();
    const password = formData.password.trim(); // Trim the password to remove extra spaces
    console.log("Password:", password);
    console.log("Password Length:", password.length);

    // Validate identifier
    if (
      !emailRegex.test(identifier) &&
      !usernameRegex.test(identifier) &&
      !phoneRegex.test(identifier)
    ) {
      newErrors.identifier =
        "Enter a valid email, username (3-20 characters), or 10-digit phone number.";
    }

    // Validate password length
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    } else if (!passwordRegex.test(password)) {
      console.log("Regex Test Result:", passwordRegex.test(password));
      newErrors.password = "Password must include letters and numbers.";
    }

    setErrors(newErrors);
    console.log("Validation Errors:", newErrors); // Log errors for debugging

    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Match identifier with email or username, and validate password
      const user = users.find(
        (user) =>
          (user.email === formData.identifier ||
            user.username === formData.identifier) &&
          user.password === formData.password
      );

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));

        navigate("/dashboard");
        setFormData({
          identifier: "",
          password: "",
        });
        // Continue to dashboard or save session token
      } else {
        alert("Invalid credentials. Please try again.");
        setErrors({
          identifier: "Invalid email, username, or phone number.",
          password: "Incorrect password.",
        });
      }
    }
  };

  const handleForgotPassword = () => {
    setShowModal(true);
  };
  const confirmForgotPassword = () => {
    const identifier = formData.identifier.trim();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(
      (u) =>
        u.email === identifier ||
        u.username === identifier ||
        u.phone === identifier
    );

    if (matchedUser) {
      localStorage.setItem("resetUserIdentifier", identifier);
      window.location.href = "/forget";
    } else {
      alert("User not found.");
      setErrors({
        identifier: "No user found with this email, username, or phone number.",
      });
    }

    setShowModal(false); // 🔸 Close the modal
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#00100F] border-[#FFFFFF33] border-[1px] rounded-[2.5rem] text-white p-10 w-full max-w-sm shadow-lg"
      >
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <img src={logo} alt="Logo" className="h-10" />
        </div>

        {/* Input Fields */}
        <div className="space-y-6 mb-8">
          <div>
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="Phone number, username or email address"
              className="w-full px-4 py-3 rounded-md bg-white text-[#707070] focus:outline-none text-sm"
            />
            {errors.identifier && (
              <p className="text-red-500 text-xs mt-1">{errors.identifier}</p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md bg-white text-[#707070] pr-10 focus:outline-none text-sm"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer text-lg "
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </span>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
        </div>

        {/* Forgot password */}
        <div className="text-right mt-4 text-sm">
          <span
            onClick={handleForgotPassword}
            className="text-[#ffffff] text-sm hover:underline cursor-pointer"
          >
            Forget password?
          </span>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-[#08C7BF] hover:bg-[#00bfae] mt-8 py-3 rounded-md font-productsans text-[#ffffff] transition-all"
        >
          Login
        </button>

        {/* Divider */}
        <div className="my-6 text-center text-sm text-[#707070]">OR</div>

        {/* Google Login */}
        <button
          type="button"
          className="w-full flex items-center justify-center py-3 rounded-md text-[#ffffff] gap-2 hover:bg-teal-500  hover:text-black transition-all"
          onClick={() =>
            (window.location.href = "http://localhost:3000/api/auth/google")
          }
        >
          <FcGoogle className="text-lg" />
          <span className="text-sm">Login with Google</span>
        </button>

        {/* Sign up Link */}
        <div className="text-center text-sm mt-8 text-[#ffffff]">
          Don't have an account?{" "}
          <Link to="/signup" className="text-white underline transition-all">
            Sign up
          </Link>
        </div>
      </form>
      {showModal && (
        <div className="fixed inset-0 bg-[#1E1E1E] bg-opacity-75 backdrop-blur-[2px] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm text-black">
            <h2 className="text-lg font-semibold mb-4">Change Password</h2>
            <p className="mb-6">Do you want to change your password?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                No
              </button>
              <button
                onClick={confirmForgotPassword}
                className="px-4 py-2 rounded bg-[#08C7BF] text-white hover:bg-[#00bfae]"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
