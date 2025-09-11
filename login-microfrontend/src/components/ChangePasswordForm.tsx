import { useState } from "react";
import { changePassword } from "../services/authService";

export default function ChangePasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (newPassword.length < 8) {
      setMessage("La contraseña debe tener al menos 8 caracteres");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await changePassword(newPassword, confirmPassword);
      setMessage(res.message || "Contraseña cambiada con éxito.");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setMessage(err.message || "Error en el servicio.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="change-password-form">
      <h2>Cambiar Contraseña</h2>
      <input
        type="password"
        placeholder="Nueva contraseña"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="password-input"
      />
      <input
        type="password"
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="password-input"
      />
      <button type="submit">Cambiar</button>
      {message && <p className={message.includes("éxito") ? "success" : "error"}>{message}</p>}
    </form>
  );
}
