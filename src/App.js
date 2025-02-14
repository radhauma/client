import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000"; // Change this after deployment

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  // Fetch items on component mount
  useEffect(() => {
    axios
      .get(`${API_URL}/items`)
      .then((response) => setItems(response.data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  // Add item
  const addItem = async () => {
    try {
      const response = await axios.post(`${API_URL}/items`, { name: newItem });
      setItems([...items, response.data]); // Update UI
      setNewItem(""); // Clear input
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Simple React + Express App</h1>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add Item"
      />
      <button onClick={addItem}>Add</button>

      <ul>
        {items.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
