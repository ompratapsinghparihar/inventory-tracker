import React, { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Items from "./pages/Items";

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
  const [isSignup, setIsSignup] = useState(false);

  if (!isAuth) {
    return isSignup ? (
      <>
        <Signup />
        <button onClick={() => setIsSignup(false)}>Go to Login</button>
      </>
    ) : (
      <>
        <Login setIsAuth={setIsAuth} />
        <button onClick={() => setIsSignup(true)}>Go to Signup</button>
      </>
    );
  }

  return <Items />;
}

export default App;