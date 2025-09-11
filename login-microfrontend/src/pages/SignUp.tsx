import SignUpForm from "../components/SignUpForm";
import "../App.css";

export default function SignUp() {
  return (
    <div className="login-page">
      <h2 className="login-title">Sign Up</h2>
      <div className="signup-container">
        <SignUpForm />
      </div>
    </div>
  );
}
