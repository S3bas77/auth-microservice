import { Button } from "antd";
import type { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline";
  htmlType?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function PrimaryButton({
  children,
  variant = "primary",
  htmlType = "button",
  disabled,
  onClick,
  style,
}: PrimaryButtonProps) {
  const baseStyle: React.CSSProperties = {
    borderRadius: 20,
    fontSize: 12,
    fontWeight: "bold",
    padding: "20px 45px",
    letterSpacing: 1,
    textTransform: "uppercase",
    transition: "transform 80ms ease-in, box-shadow 0.3s ease, background 0.3s ease",
    cursor: "pointer",
    outline: "none",
  };

  const primaryStyle: React.CSSProperties = {
    ...baseStyle,
    border: "1px solid #2563eb",
    background:
      "linear-gradient(135deg, #2563eb 0%, #3b82f6 70%, #7c3aed 100%)",
    color: "#fff",
  };

  const outlineStyle: React.CSSProperties = {
    ...baseStyle,
    border: "1px solid #fff",
    backgroundColor: "transparent",
    color: "#fff",
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (variant === "primary") {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 8px 25px rgba(37, 99, 235, 0.3)";
    } else {
      e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (variant === "primary") {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
    } else {
      e.currentTarget.style.backgroundColor = "transparent";
    }
  };

  return (
    <Button
      type={variant === "primary" ? "primary" : "default"}
      htmlType={htmlType}
      disabled={disabled}
      onClick={onClick}
      style={{
        ...(variant === "primary" ? primaryStyle : outlineStyle),
        ...style,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Button>
  );
}
