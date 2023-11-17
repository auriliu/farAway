//
import { useState } from "react";
import "./index.css";

import Logo from "./components/Logo";
import Stats from "./components/Stats";
import PackingList from "./components/PackingList";
import Form from "./components/Form";

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

export default App;
