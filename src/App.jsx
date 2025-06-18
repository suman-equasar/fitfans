import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import ForgotPassword from "./auth/ForgotPassword";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
