import React, { useEffect } from "react";
import logo from "../assets/Logo.svg";

const ForgetPassword = () => {
  const [formData, setFormData] = React.useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = React.useState({});
  const [resetUser, setResetUser] = React.useState(null); // user to be updated

  useEffect(() => {
    const identifier = localStorage.getItem("resetUserIdentifier");
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(
      (u) =>
        u.email === identifier ||
        u.username === identifier ||
        u.phone === identifier
    );

    if (matchedUser) {
      setResetUser(matchedUser);
    } else {
      alert("User not found.");
      window.location.href = "/login";
    }
  }, []);

  const validate = () => {
    const newErrors = {};
    if (
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/.test(formData.password)
    ) {
      newErrors.password =
        "Password must be at least 8 characters with letters and numbers";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resetUser) return;

    if (validate()) {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const updatedUsers = users.map((user) =>
        user.email === resetUser.email ||
        user.username === resetUser.username ||
        user.phone === resetUser.phone
          ? { ...user, password: formData.password }
          : user
      );

      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.removeItem("resetUserIdentifier");

      alert("Password updated successfully!");
      setFormData({ password: "", confirmPassword: "" });
      window.location.href = "/login"; // redirect to login
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <form
        className="bg-[#00100F] border-[#FFFFFF33] border-[1px] rounded-[2.5rem] text-white p-10 w-full max-w-sm shadow-lg"
        onSubmit={handleSubmit}
      >
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <img src={logo} alt="Logo" className="h-12" />
        </div>

        <div className="space-y-12 mb-10">
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter a new password"
              className="w-full px-4 py-3 rounded-md bg-white text-[#707070] focus:outline-none text-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="w-full px-4 py-3 rounded-md bg-white text-[#707070] focus:outline-none text-sm"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={!resetUser}
            className={`w-full mt-10 py-3 rounded-md font-productsans transition-all ${
              resetUser
                ? "bg-[#08C7BF] hover:bg-[#00bfae] text-white"
                : "bg-gray-500 cursor-not-allowed"
            }`}
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
