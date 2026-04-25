import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Items from "./pages/Items";
import Requests from "./pages/Requests";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  const [page, setPage] = useState("items");
  const [authPage, setAuthPage] = useState("login");
  const [theme, setTheme] = useState("pink");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className={`container ${theme}`}>
      <h1>📦 Inventory Tracker</h1>

      {!isLoggedIn ? (
        <>
          {authPage === "login" ? (
            <>
              <Login onLogin={() => setIsLoggedIn(true)} />
              <p>
                Don’t have account?{" "}
                <button onClick={() => setAuthPage("signup")}>
                  Signup
                </button>
              </p>
            </>
          ) : (
            <>
              <Signup />
              <p>
                Already have account?{" "}
                <button onClick={() => setAuthPage("login")}>
                  Login
                </button>
              </p>
            </>
          )}
        </>
      ) : (
        <>
          <div className="navbar">
            <div>Dashboard</div>

            <div className="nav-buttons">
              <button onClick={() => setPage("items")}>Items</button>
              <button onClick={() => setPage("requests")}>Requests</button>

              {/* Theme Switch */}
              <select onChange={(e) => setTheme(e.target.value)}>
                <option value="pink">🌸 Pink</option>
                <option value="light">☀ Light</option>
                <option value="dark">🌙 Dark</option>
              </select>

              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>

          {page === "items" && <Items />}
          {page === "requests" && <Requests />}
        </>
      )}
    </div>
  );
}

export default App;