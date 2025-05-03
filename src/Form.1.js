import { useState } from "react";

// FORM COMPONENT
export function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
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
        onChange={(e) => setDescription(e.target.value)} />

      <button>Add</button>
    </form>
  );
}
// PACKINGLIST COMPONENT
export function Packinglist({ items, onDeleteitem, onToggleItems, onClearList }) {
  const [sortBy, setSortBy] = useState("input");



  let sortedItems;

  if (sortBy === 'input') sortedItems = items;

  if (sortBy === 'description')
    sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === 'packed')
    sortedItems = items.sort((a, b) => Number(a.packed) - Number(b.packed));



  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item item={item} onDeleteitem={onDeleteitem} onToggleItems={onToggleItems} key={item.id} />

        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="input"> sort by input order</option>
          <option value="description"> sort by description</option>
          <option value="packed"> sort by packed Status</option>
        </select>
        <button onClick={onClearList}>clear</button>
      </div>
    </div>
  );
}
// ITEM COMPONENT
function Item({ item, onDeleteitem, onToggleItems }) {

  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => onToggleItems(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}{" "}
      </span>
      <button onClick={() => onDeleteitem(item.id)}>❌</button>
    </li>
  );
}
// FOOTER COMPONENT
export function Stats({ items }) {
  if (!items.length) return <footer className="stats"><em>Start adding items to your list 🚀</em></footer>;
  const numItems = items.length;
  console.log(numItems);
  const numPacked = items.filter(item => item.packed).length;
  const percentage = Math.round((numPacked / numItems * 100));
  console.log(percentage);

  return (
    <footer className="stats">
      <em>
        {percentage === 100 ? 'You packed evrything! Ready to go. ✈️' : ` 💼you have ${numItems} in yourlist, and you have already packed ${numPacked} items.`}
      </em>
    </footer>
  );
}
