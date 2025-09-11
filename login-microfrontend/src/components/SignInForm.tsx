import { useState } from "react";
import { loginUser } from "../api/loginUser";
import PopUpForgotPassword from "./PopUpForgotPassword";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import type { InferType } from "yup";
import { Form, Input, Typography, message as antdMessage } from "antd";
import SocialLoginButtons from "./SocialLoginButtons";
import PrimaryButton from "./PrimaryButton";

const { Text } = Typography;

const signInSchema = object({
  email: string().required("Email requerido").email("Email inválido"),
  password: string().required("Contraseña requerida"),
});
type SignInFormData = InferType<typeof signInSchema>;

export default function SignInForm() {
  const [showForgot, setShowForgot] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm<SignInFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [messageApi, contextHolder] = antdMessage.useMessage();

  const onFinish = async (values: SignInFormData) => {
    setIsSubmitting(true);
    try {
      await signInSchema.validate(values, { abortEarly: false });

      const data = await loginUser({
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("session_id", data.session_id);
      localStorage.setItem("isAuthenticated", "true");

      messageApi.success(data.msg || "Has iniciado sesión correctamente");

      navigate("/");
    } catch (error: any) {
      if (error && typeof error === "object" && "inner" in error) {
        const validationError = error as {
          inner?: Array<{ path?: string; message: string }>;
        };
        const fieldErrors: Record<string, string[]> = {};
        validationError.inner?.forEach((err) => {
          if (err.path) fieldErrors[err.path] = [err.message];
        });
        form.setFields(
          Object.entries(fieldErrors).map(([name, errors]) => ({
            name: name as any,
            errors,
          }))
        );
      } else {
        messageApi.error(error?.message ?? "No se pudo iniciar sesión");
        form.setFields([
          { name: "email", errors: [" "] },
          { name: "password", errors: [" "] },
        ]);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "0 50px",
        height: "100%",
        textAlign: "center",
      }}
    >
      {contextHolder}

      <h1 style={{ fontWeight: "bold", margin: 0 }}>Sign in</h1>
      <SocialLoginButtons />
      <Text style={{ fontSize: 12 }}>or use your account</Text>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ width: "100%", marginTop: 16 }}
      >
        <Form.Item name="email">
          <Input placeholder="Email" type="email" size="large" />
        </Form.Item>

        <Form.Item name="password">
          <Input.Password placeholder="Password" size="large" />
        </Form.Item>

        <a
          href="#"
          style={{
            color: "#2563eb",
            fontSize: 14,
            textDecoration: "none",
            margin: "15px 0",
            display: "block",
            transition: "color 0.3s ease",
          }}
          onClick={(e) => {
            e.preventDefault();
            setShowForgot(true);
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#1d4ed8";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#2563eb";
          }}
        >
          Forgot your password?
        </a>

        <PopUpForgotPassword
          open={showForgot}
          onClose={() => setShowForgot(false)}
        />

        <PrimaryButton
          htmlType="submit"
          disabled={isSubmitting}
          style={{
            opacity: isSubmitting ? 0.7 : 1,
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </PrimaryButton>
      </Form>

      <button
        type="button"
        onClick={() => navigate("/signup")}
        style={{
          background: "#fff",
          color: "#2563eb",
          border: "1px solid #2563eb",
          borderRadius: 6,
          padding: "8px 20px",
          fontWeight: 500,
          cursor: isSubmitting ? "not-allowed" : "pointer",
          marginTop: 12,
        }}
        disabled={isSubmitting}
      >
        SIGN UP
      </button>
    </div>
  );
}
