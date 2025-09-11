import { Typography } from "antd";
import PrimaryButton from "./PrimaryButton";

const { Title, Paragraph } = Typography;

interface OverlayPanelProps {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  position: "left" | "right";
  isActive: boolean;
}

export default function OverlayPanel({
  title,
  description,
  buttonText,
  onClick,
  position,
  isActive,
}: OverlayPanelProps) {
  const getTransform = () => {
    if (position === "left") {
      return isActive ? "translateX(0)" : "translateX(-20%)";
    } else {
      return isActive ? "translateX(20%)" : "translateX(0)";
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "0 40px",
        textAlign: "center",
        top: 0,
        height: "100%",
        width: "50%",
        transform: getTransform(),
        transition: "transform 0.6s ease-in-out",
        [position]: 0,
      }}
    >
      <Title level={2} style={{ margin: 0}}>
        {title}
      </Title>
      <Paragraph
        style={{
          fontSize: 14,
          fontWeight: 100,
          lineHeight: "20px",
          letterSpacing: "0.5px",
          margin: "20px 0 30px",
          color: "#fff"
        }}
      >
        {description}
      </Paragraph>
      <PrimaryButton variant="outline" onClick={onClick}>
        {buttonText}
      </PrimaryButton>
    </div>
  );
}
