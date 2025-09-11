import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SuccessPage from "./pages/SuccessPage";
import ResetPassword from "./pages/ResetPassword";
import ResetConfirmationPage from "./pages/ResetConfirmationPage";
import SignUp from "./pages/SignUp";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/reset-confirmation" element={<ResetConfirmationPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
