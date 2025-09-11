import { useState } from "react";
import { Card } from "antd";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import OverlayPanel from "./OverlayPanel";

export default function LoginContainer() {
  const [type, setType] = useState<"signIn" | "signUp">("signIn");

  const handleOnClick = (text: "signIn" | "signUp") => {
    if (text !== type) setType(text);
  };

  const isRightPanelActive = type === "signUp";

  return (
    <Card
      style={{
        position: "relative",
        overflow: "hidden",
        width: 1000,
        maxWidth: "100%",
        minHeight: 680,
        borderRadius: 10,
        boxShadow: "0 14px 28px rgba(37,99,235,0.25), 0 10px 10px rgba(37,99,235,0.15)",
        padding: 0,
        border: "none",
      }}
      styles={{
        body: {
          padding: "0px",
        },
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "50%",
          transition: "all 0.6s ease-in-out",
          transform: isRightPanelActive ? "translateX(100%)" : "translateX(0)",
          opacity: isRightPanelActive ? 1 : 0,
          zIndex: isRightPanelActive ? 5 : 1,
        }}
      >
        <SignUpForm />
      </div>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "50%",
          transition: "all 0.6s ease-in-out",
          transform: isRightPanelActive ? "translateX(100%)" : "translateX(0)",
          zIndex: 2,
        }}
      >
        <SignInForm />
      </div>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: "50%",
          height: "100%",
          overflow: "hidden",
          transition: "transform 0.6s ease-in-out",
          zIndex: 100,
          transform: isRightPanelActive ? "translateX(-100%)" : "translateX(0)",
        }}
      >
        <div
          style={{
            position: "relative",
            left: "-100%",
            height: "100%",
            width: "200%",
            background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 40%, #7c3aed 100%)",
            transform: isRightPanelActive ? "translateX(50%)" : "translateX(0)",
            transition: "transform 0.6s ease-in-out",
            color: "#fff",
          }}
        >
          <OverlayPanel
            title="Welcome Back!"
            description="To keep connected with us please login with your personal info"
            buttonText="Sign In"
            onClick={() => handleOnClick("signIn")}
            position="left"
            isActive={isRightPanelActive}
          />
          <OverlayPanel
            title="Hello, Friend!"
            description="Enter your personal details and start journey with us"
            buttonText="Sign Up"
            onClick={() => handleOnClick("signUp")}
            position="right"
            isActive={isRightPanelActive}
          />
        </div>
      </div>
    </Card>
  );
}
