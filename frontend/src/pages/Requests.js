import { useEffect, useState } from "react";
import API from "../api/axios";

function Requests() {
  const [requests, setRequests] = useState([]);
  const [items, setItems] = useState([]);
  const [itemId, setItemId] = useState("");
  const [quantity, setQuantity] = useState("");

  const fetchRequests = async () => {
    try {
      const res = await API.get("/requests");
      setRequests(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchItems = async () => {
    try {
      const res = await API.get("/items");
      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchItems();
  }, []);

  const handleRequest = async () => {
    if (!itemId || !quantity) {
      alert("Fill all fields");
      return;
    }

    try {
      await API.post("/requests", {
        item_id: Number(itemId),
        quantity: Number(quantity),
      });

      setItemId("");
      setQuantity("");

      fetchRequests();
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/requests/${id}`, { status });
      fetchRequests();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="card">
        <h2>📄 Requests</h2>

        <div className="input-group">
          <select onChange={(e) => setItemId(e.target.value)}>
            <option>Select Item</option>
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <button className="btn btn-primary" onClick={handleRequest}>
            Send
          </button>
        </div>
      </div>

      {requests.map((req) => (
        <div className="card" key={req.id}>
          <p>Item ID: {req.item_id}</p>
          <p>Qty: {req.quantity}</p>
          <p>Status: {req.status}</p>

          <button
            className="btn btn-warning"
            onClick={() => updateStatus(req.id, "approved")}
          >
            Approve
          </button>

          <button
            className="btn btn-danger"
            onClick={() => updateStatus(req.id, "rejected")}
          >
            Reject
          </button>

          <button
            className="btn btn-primary"
            onClick={() => updateStatus(req.id, "delivered")}
          >
            Deliver
          </button>
        </div>
      ))}
    </div>
  );
}

export default Requests;