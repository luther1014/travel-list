import { useState } from "react";
import { Logo } from "./Logo";
import { Form } from "./Form";
import { PackingList } from "./PackingList";
import { Stats } from "./Stats";

export default function App() {
  const [items, setItems] = useState([]);

  function handleItemSave(item) {
    setItems(() => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleCheckbox(id) {
    setItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          return { ...item, packed: !item.packed };
        }
        return item;
      })
    );
  }

  function handleClearList() {
    if (window.confirm("Are you sure you to clear the list ?")) {
      setItems([]);
    }
  }

  return (
    <>
      <Logo />
      <Form handleSaveItem={handleItemSave} />
      <PackingList
        items={items}
        handleDeleteItem={handleDeleteItem}
        handleCheckbox={handleCheckbox}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </>
  );
}
