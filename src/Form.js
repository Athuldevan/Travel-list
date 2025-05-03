import { useState } from "react";
// FORM COMPONENT
export default function Form({onAddItems}) {
  const [description, setDescription] = ("");
  const [quantity, setQuantity] = useState(1);

 

  function handlesubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = { id: Date.now(), description, packed: false, quantity };
    console.log(newItem);

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handlesubmit}>
      <h3>What you need for your trip 😍 ?</h3>

      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="item "
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button>Add</button>
    </form>
  );
}