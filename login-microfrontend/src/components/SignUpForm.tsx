import { useState } from "react";
import { object, string } from "yup";
import type { InferType } from "yup";
import { Form, Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import SocialLoginButtons from "./SocialLoginButtons";
import PrimaryButton from "./PrimaryButton";
import { registerUser } from "../services/registerUser";

const signUpSchema = object({
  firstName: string().required("Nombre requerido"),
  lastName: string().required("Apellido requerido"),
  email: string().required("Email requerido").email("Email inválido"),
  password: string()
    .required("Contraseña requerida")
    .min(8, "Mínimo 8 caracteres"),
});

type SignUpFormData = InferType<typeof signUpSchema>;

export default function SignUpForm() {
  const [form] = Form.useForm<SignUpFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (value: string) => {
    if (value.length < 8) {
      setPasswordError("Mínimo 8 caracteres");
    } else {
      setPasswordError("");
    }
    if (apiError) {
      setApiError("");
    }
  };

  const handleInputChange = () => {
    // Clear API error when user starts typing in any field
    if (apiError) {
      setApiError("");
    }
  };

  const onFinish = async (values: SignUpFormData) => {
    setIsSubmitting(true);
    setApiError("");

    try {
      // Validate form data
      await signUpSchema.validate(values, { abortEarly: false });

      // Transform form data to match the service interface
      const registerData = {
        nombre: `${values.firstName} ${values.lastName}`,
        email: values.email,
        contraseña: values.password,
      };

      // Call the registration service
      const response = await registerUser(registerData);

      if (response.success) {
        setShowSuccessModal(true);
      } else {
        setApiError(response.message || "Error al registrar usuario");
      }
    } catch (error) {
      if (error && typeof error === "object" && "inner" in error) {
        // Handle Yup validation errors
        const validationError = error as {
          inner?: Array<{ path?: string; message: string }>;
        };
        const fieldErrors = validationError.inner
          ?.map((err) => {
            if (!err.path) return null;
            return {
              name: err.path as "firstName" | "lastName" | "email" | "password",
              errors: [err.message],
            };
          })
          .filter(Boolean) as {
          name: "firstName" | "lastName" | "email" | "password";
          errors: string[];
        }[];
        form.setFields(fieldErrors);
      } else if (error instanceof Error) {
        // Handle API errors
        setApiError(error.message);
      } else {
        setApiError("Error inesperado al registrar usuario");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOk = () => {
    setShowSuccessModal(false);
    form.resetFields();
    navigate("/");
  };

  const handleCancel = () => {
    setShowSuccessModal(false);
    form.resetFields();
    navigate("/");
  };

  return (
    <div className="signup-form-container">
      <h1 className="signup-title">Create Account</h1>
      <SocialLoginButtons />
      <span className="signup-subtitle">
        or use your email for registration
      </span>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="signup-form"
      >
        <Form.Item name="firstName">
          <Input
            placeholder="Nombre"
            size="large"
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item name="lastName">
          <Input
            placeholder="Apellido"
            size="large"
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item name="email">
          <Input
            placeholder="Email"
            type="email"
            size="large"
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item name="password" help={passwordError}>
          <Input.Password
            placeholder="Password"
            size="large"
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
        </Form.Item>
        <PrimaryButton
          htmlType="submit"
          disabled={isSubmitting || !!passwordError}
          style={{
            marginTop: "10px",
            opacity: isSubmitting ? 0.7 : 1,
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Creando..." : "Sign Up"}
        </PrimaryButton>
      </Form>
      {apiError && (
        <div className="signup-error">
          {apiError}
        </div>
      )}
      <Modal
        open={showSuccessModal}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        closable={false}
        okText="Aceptar"
        cancelButtonProps={{ style: { display: "none" } }}
        className="signup-modal"
      >
        <div className="signup-success-modal">
          <h3>Cuenta creada</h3>
          <p>Tu cuenta se ha creado correctamente.</p>
        </div>
      </Modal>
    </div>
  );
}
