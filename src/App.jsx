import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import ForgotPassword from "./auth/ForgotPassword";
import MainLayout from "./Layout/MainLayout";
import Profile from "./pages/Profile";
import More from "./pages/More";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forget" element={<ForgotPassword />} />

        <Route path="/dashboard" element={<MainLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="more" element={<More />} />
          {/* Add more child routes as needed */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
