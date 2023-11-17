import { useState } from "react";

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

export default Form;
