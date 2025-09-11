import ResetPasswordForm from "../components/ResetPasswordForm";
import "../App.css";

export default function ResetPassword() {
  return (
    <div className="login-page">
      <h2 className="login-title">Reset Password</h2>
      <div className="reset-password-container">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
