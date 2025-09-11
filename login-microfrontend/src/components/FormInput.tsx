import { forwardRef, type InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  error?: string;
  label?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ placeholder, error, label, style, ...props }, ref) => {
    const hasError = !!error;

    return (
      <div style={{ width: "100%", margin: "8px 0" }}>
        {label && (
          <label
            style={{
              display: "block",
              marginBottom: "4px",
              fontSize: "14px",
              fontWeight: "500",
              color: "#374151",
            }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          placeholder={placeholder}
          style={{
            backgroundColor: "#f8fafc",
            border: `1px solid ${hasError ? "#ef4444" : "#e2e8f0"}`,
            padding: "12px 15px",
            width: "100%",
            borderRadius: "6px",
            outline: "none",
            fontSize: "14px",
            transition: "all 0.3s ease",
            ...style,
          }}
          onFocus={(e) => {
            if (!hasError) {
              e.target.style.borderColor = "#3b82f6";
              e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
            }
          }}
          onBlur={(e) => {
            if (!hasError) {
              e.target.style.borderColor = "#e2e8f0";
              e.target.style.boxShadow = "none";
            }
          }}
          {...props}
        />
        {error && (
          <p
            style={{
              color: "#ef4444",
              fontSize: "12px",
              marginTop: "4px",
              marginBottom: "0",
            }}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
