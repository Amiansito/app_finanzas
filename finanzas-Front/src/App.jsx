import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState(""); // nuevo campo nombre
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (isRegister) {
      if (!name.trim()) {
        setMessage("El nombre es obligatorio");
        return;
      }
      if (password.length < 8) {
        setMessage("La contraseña debe tener al menos 8 caracteres");
        return;
      }
      if (password !== confirmPassword) {
        setMessage("Las contraseñas no coinciden");
        return;
      }
      // Registro
      try {
        const res = await axios.post("http://127.0.0.1:8000/api/register", {
          name,
          email,
          password,
        });
        setMessage("Registro exitoso");
      } catch (err) {
        setMessage(err.response?.data?.message || "Error en el registro");
      }
    } else {
      // Login
      try {
        const res = await axios.post("http://127.0.0.1:8000/api/login", {
          email,
          password,
        });
        setMessage("Login exitoso");
      } catch (err) {
        setMessage(err.response?.data?.message || "Error en el login");
      }
    }
  };

  return (
    <div style={{ width: "300px", margin: "50px auto" }}>
      <h2>{isRegister ? "Registro" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
        )}

        <div style={{ marginBottom: "10px" }}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ position: "relative", marginBottom: "10px" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", paddingRight: "30px" }}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "5px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {password.length > 0 && password.length < 8 && (
          <p style={{ color: "red", marginTop: "-8px", marginBottom: "10px" }}>
            La contraseña debe tener al menos 8 caracteres
          </p>
        )}

        {isRegister && (
          <div style={{ position: "relative", marginBottom: "10px" }}>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", paddingRight: "30px" }}
            />
            <span
              onClick={() => setShowConfirm(!showConfirm)}
              style={{
                position: "absolute",
                right: "5px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        )}

        {message && <p style={{ color: "red" }}>{message}</p>}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "8px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {isRegister ? "Registrarse" : "Login"}
        </button>
      </form>

      <p style={{ marginTop: "10px" }}>
        {isRegister
          ? "¿Ya tenés cuenta?"
          : "¿No tenés cuenta?"}{" "}
        <span
          onClick={() => setIsRegister(!isRegister)}
          style={{ color: "blue", cursor: "pointer" }}
        >
          {isRegister ? "Iniciar sesión" : "Registrarse"}
        </span>
      </p>
    </div>
  );
};

export default AuthForm;
