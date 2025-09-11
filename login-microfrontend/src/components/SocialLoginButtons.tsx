import { Button, Space } from "antd";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";

interface SocialLoginButtonsProps {
  className?: string;
}

export default function SocialLoginButtons({ className }: SocialLoginButtonsProps) {
  return (
    <Space
      className={className}
      style={{ margin: "20px 0" }}
      size="middle"
    >
      <Button
        shape="circle"
        icon={<FaFacebookF />}
        href="#"
        style={{
          borderColor: "#e2e8f0",
          color: "#2563eb",
          boxShadow: "0 2px 4px rgba(37, 99, 235, 0.1)",
        }}
      />

      <Button
        shape="circle"
        icon={<FaGooglePlusG />}
        href="#"
        style={{
          borderColor: "#e2e8f0",
          color: "#2563eb",
          boxShadow: "0 2px 4px rgba(37, 99, 235, 0.1)",
        }}
      />

      <Button
        shape="circle"
        icon={<FaLinkedinIn />}
        href="#"
        style={{
          borderColor: "#e2e8f0",
          color: "#2563eb",
          boxShadow: "0 2px 4px rgba(37, 99, 235, 0.1)",
        }}
      />
    </Space>
  );
}
