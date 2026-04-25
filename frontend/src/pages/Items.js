import { useEffect, useState } from "react";
import API from "../api/axios";

function Items() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [threshold, setThreshold] = useState("");

  const fetchItems = async () => {
    try {
      const res = await API.get("/items");
      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAdd = async () => {
    if (!name || !quantity || !threshold) {
      alert("Fill all fields");
      return;
    }

    try {
      await API.post("/items", {
        name,
        quantity: Number(quantity),
        threshold: Number(threshold),
      });

      setName("");
      setQuantity("");
      setThreshold("");

      fetchItems();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="card">
        <h2>📦 Items</h2>

        <div className="input-group">
          <input
            placeholder="Item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <input
            type="number"
            placeholder="Threshold"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
          />

          <button className="btn btn-primary" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>

      {items.map((item) => (
        <div className="card" key={item.id}>
          <h3>{item.name}</h3>
          <p>Qty: {item.quantity}</p>
          <p>Threshold: {item.threshold}</p>

          {item.quantity < item.threshold && (
            <p style={{ color: "red" }}>⚠ Low Stock</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default Items;