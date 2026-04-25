import { useState } from "react";
import API from "../api/axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await API.post("/users", {
        name,
        email,
        password,
        role: "sdp",
        location: "default",
      });

      alert("Signup successful, now login");
    } catch (err) {
      console.log(err);
      alert("Signup failed");
    }
  };

  return (
    <div>
      <h2>Signup</h2>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;