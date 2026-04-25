import { useState } from "react";
import API from "../api/axios";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.access_token);

    onLogin();

  } catch (err) {
    console.log(err);
    alert("Login failed");
  }
};

  return (
    <div>
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;