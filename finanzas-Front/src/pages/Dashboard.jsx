import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // si no hay token, redirige al login
    }
  }, []);

  return <h1>Bienvenido al Dashboard</h1>;
}
