import { useState } from "react";
import Logo from "./Logo";
import { Form, Packinglist, Stats } from "./Form.1";

export default function App() {
  const [items, setItems] = useState([]);

  // ADD ITEM
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  // DELETE ITEM
  function handleDeleteItem(id) {
    console.log(id);
    setItems((items) => items.filter((item) => item.id != id));
  }

  // TOGLLE ITEM
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  // CLEARLIST
  function handleClearList() {
    const isConfirm = window.confirm(
      `Are you sure you want to delete all items`
    );
    if (!isConfirm) return;
    setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <Packinglist
        items={items}
        onDeleteitem={handleDeleteItem}
        onToggleItems={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
