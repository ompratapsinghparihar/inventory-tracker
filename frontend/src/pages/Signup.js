import { useState } from "react";
import api from "../api/axios";

function Signup({ setPage }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    location: "",
  });

  const handleSignup = async () => {
    try {
      await api.post("/users/", form);
      alert("Signup successful");
      setPage("login");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <div>
      <h2>Signup</h2>

      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <input placeholder="Location" onChange={(e) => setForm({ ...form, location: e.target.value })} />

      <button onClick={handleSignup}>Signup</button>

      <p>
        Already have account?{" "}
        <button onClick={() => setPage("login")}>Login</button>
      </p>
    </div>
  );
}

export default Signup;