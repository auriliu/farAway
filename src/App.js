//
import { useState } from "react";
import "./index.css";

function App() {
  const [items, setItems] = useState([]);

  function addItem(item) {
    setItems((prev) => [...prev, item]);
  }
  function deleteItem(id) {
    // delete means to update the UI
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={addItem} />
      <PackingList items={items} onDeleteItem={deleteItem} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>far away</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      description,
      quantity,
      id: Date.now(),
    };

    console.log(newItem);
    onAddItem(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <div className="add-form">
      <h3>what do u need for your trip?</h3>
      <form onSubmit={handleSubmit}>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>add</button>
      </form>
    </div>
  );
}

function PackingList({ items, onDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} onDeleteItem={onDeleteItem} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : null}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <p>Stats</p>
    </footer>
  );
}

export default App;
