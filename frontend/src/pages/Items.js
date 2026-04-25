import { useState, useEffect } from "react";
import api from "../api/axios";

function Items() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    quantity: 0,
    threshold: 0,
  });

  const fetchItems = async () => {
    const res = await api.get("/items/");
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async () => {
    await api.post("/items/", form);
    fetchItems();
  };

  return (
    <div>
      <h2>Items</h2>

      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Quantity" type="number" onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} />
      <input placeholder="Threshold" type="number" onChange={(e) => setForm({ ...form, threshold: Number(e.target.value) })} />

      <button onClick={addItem}>Add</button>

      <ul>
        {items.map((i) => (
          <li key={i.id}>
            {i.name} - {i.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Items;