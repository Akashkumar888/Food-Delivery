
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

export default function LoginSuccess() {
  const { setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      setToken(token);
    }

    navigate("/"); // redirect to homepage after setting token
  }, [navigate, setToken]);

  return <p>Logging you in...</p>;
}
