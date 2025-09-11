import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function ResetConfirmationPage() {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <h2 className="login-title">Confirmación</h2>
      <div className="login-success-message" style={{ padding: 24, textAlign: "center" }}>
        <p style={{ fontSize: 18, marginBottom: 8 }}>Contraseña guardada</p>
        <p style={{ marginTop: 0, color: "#6b7280" }}>
          Tu contraseña se ha actualizado correctamente.
        </p>
        <div style={{ marginTop: 20 }}>
          <Button type="primary" onClick={() => navigate("/")} style={{ marginRight: 8 }}>
            Ir al inicio
          </Button>
          <Button onClick={() => navigate("/login")}>Ir a iniciar sesión</Button>
        </div>
      </div>
    </div>
  );
}
