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
  function toggleItem(id) {
    // delete means to update the UI
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={addItem} />
      <PackingList
        items={items}
        onDeleteItem={deleteItem}
        onToggleItem={toggleItem}
        setItems={setItems}
      />
      <Stats items={items} />
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

    // cool line: if nothing is typed in, dont allow to submit.
    if (!description) return;

    const newItem = {
      description,
      quantity,
      id: Date.now(),
    };

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

function PackingList({ items, onDeleteItem, onToggleItem, setItems }) {
  const [sortBy, setSortBy] = useState("input");

  function handleClearList() {
    const confirmed = window.confirm(
      "are you sure u want to clear the entire list?  "
    );
    if (confirmed) setItems([]);
  }

  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">sort by input order</option>
          <option value="description">sort by description</option>
          <option value="packed">sort by packed status</option>
        </select>
        <button onClick={handleClearList}>clear list</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : null}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  // an early return
  if (!items.length)
    return <p className="stats">start adding items to your list ✈</p>;

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <p>
        {percentage === 100
          ? "everything's packed! 🌴"
          : `you have ${numItems} ${
              numItems === 1 ? "item" : "items"
            } on your list, and you already have packed
        ${percentage}%.`}
      </p>
    </footer>
  );
}

export default App;
