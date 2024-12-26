export function Item({ item, handleDeleteItem, handleCheckbox }) {
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
