import { useState } from "react";
import api from "../api/axios";

function Login({ setPage, setIsAuth }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.access_token);

      setIsAuth(true);
      setPage("items");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={handleLogin}>Login</button>

      <p>
        New user?{" "}
        <button onClick={() => setPage("signup")}>Signup</button>
      </p>
    </div>
  );
}

export default Login;