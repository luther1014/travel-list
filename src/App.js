import { useState } from "react";

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

  return (
    <>
      <Logo />
      <Form handleSaveItem={handleItemSave} />
      <PackingList
        items={items}
        handleDeleteItem={handleDeleteItem}
        handleCheckbox={handleCheckbox}
      />
      <Stats items={items} />
    </>
  );
}

function Logo() {
  return <h1>🏖️🍷 Far Away 🏕️🌃</h1>;
}

function Form({ handleSaveItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    const item = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };
    console.log("new item:", item);
    handleSaveItem(item);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip 😍 ?</h3>

      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

function PackingList({ items, handleDeleteItem, handleCheckbox }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            handleDeleteItem={handleDeleteItem}
            handleCheckbox={handleCheckbox}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, handleDeleteItem, handleCheckbox }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => handleCheckbox(item.id)}
      />
      <span style={{ textDecoration: item.packed && "line-through" }}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handleDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding items to your packing list 🚀</em>
      </p>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You have everything! Ready to go ✈️"
          : `💼 You have ${numItems} items in your list. You have already packed
        ${numPacked} (${percentage})%.`}
      </em>
    </footer>
  );
}
