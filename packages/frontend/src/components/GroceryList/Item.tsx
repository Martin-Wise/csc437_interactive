interface Item {
  isChecked: boolean;
  name: string;
  quantity: number;
  category: string;
}

interface ItemType {
  toggleCheck: () => void;
  item: Item;
}

function Item({ item, toggleCheck }: ItemType) {
  return (
  <div className="item">
    <input
      type="checkbox"
      id={`box=${item.name}`}
      checked={item.isChecked}
      onChange={toggleCheck}
    />
    <label htmlFor={`box=${item.name}`} className={item.isChecked ? "strikethrough" : ""}>
      {item.quantity} x {item.name}
    </label>
  </div>
  );
}
export default Item;