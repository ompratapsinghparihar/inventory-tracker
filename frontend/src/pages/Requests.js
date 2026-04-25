import { useState, useEffect } from "react";
import api from "../api/axios";

function Requests() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const res = await api.get("/requests/");
    setRequests(res.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      <h2>Requests</h2>

      <ul>
        {requests.map((r) => (
          <li key={r.id}>
            {r.item_id} - {r.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Requests;