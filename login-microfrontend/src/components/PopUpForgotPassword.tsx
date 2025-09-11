
import { Modal, Form, Input } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface PopUpForgotPasswordProps {
	open: boolean;
	onClose: () => void;
}


const PopUpForgotPassword = ({ open, onClose }: PopUpForgotPasswordProps) => {
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();
	const navigate = useNavigate();

	const handleNext = async () => {
		try {
			setLoading(true);
			await form.validateFields();
			setLoading(false);
			onClose();
			navigate("/resetpassword");
		} catch {
			setLoading(false);
		}
	};

	const handleCancel = () => {
		form.resetFields();
		onClose();
	};

	return (
		<Modal
			open={open}
			onCancel={handleCancel}
			footer={null}
			closable={false}
			centered
			bodyStyle={{ padding: 32 }}
			style={{ borderRadius: 12 }}
		>
			<h2 style={{ color: "#2563eb", fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>¿Olvidaste tu contraseña?</h2>
			<Form form={form} layout="vertical" style={{ marginBottom: 0 }}>
				<Form.Item
					name="email"
					label="Correo electrónico"
					rules={[
						{ required: true, message: "Por favor ingresa tu correo" },
						{ type: "email", message: "Correo inválido" },
					]}
				>
					<Input placeholder="Ingresa tu correo" size="large" autoFocus />
				</Form.Item>
				<div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
					<button
						type="button"
						onClick={handleCancel}
						style={{
							background: '#fff',
							color: '#2563eb',
							border: '1px solid #2563eb',
							borderRadius: 6,
							padding: '6px 18px',
							fontWeight: 500,
							cursor: 'pointer',
							transition: 'background 0.2s',
						}}
						disabled={loading}
					>
						Cancelar
					</button>
					<button
						type="button"
						onClick={handleNext}
						style={{
							background: '#2563eb',
							color: '#fff',
							border: 'none',
							borderRadius: 6,
							padding: '6px 18px',
							fontWeight: 500,
							cursor: 'pointer',
							transition: 'background 0.2s',
							opacity: loading ? 0.7 : 1,
						}}
						disabled={loading}
					>
						Siguiente
					</button>
				</div>
			</Form>
		</Modal>
	);
};

export default PopUpForgotPassword;
