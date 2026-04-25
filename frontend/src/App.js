import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Items from "./pages/Items";
import Requests from "./pages/Requests";

function App() {
  const [page, setPage] = useState("login");
  const [isAuth, setIsAuth] = useState(false);

  if (!isAuth) {
    return page === "login" ? (
      <Login setPage={setPage} setIsAuth={setIsAuth} />
    ) : (
      <Signup setPage={setPage} />
    );
  }

  return (
    <div>
      <h1>Inventory Tracker</h1>

      <button onClick={() => setPage("items")}>Items</button>
      <button onClick={() => setPage("requests")}>Requests</button>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          setIsAuth(false);
        }}
      >
        Logout
      </button>

      {page === "items" && <Items />}
      {page === "requests" && <Requests />}
    </div>
  );
}

export default App;