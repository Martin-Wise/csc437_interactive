import { useState } from "react";
import "./AddItemStyles.css";
import { ObjectId } from 'bson';

interface AddItemProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  onCloseRequested: React.Dispatch<React.SetStateAction<void>>;
  authToken: string;
}

interface Item {
  _id: string;
  name: string;
  quantity: number;
  category: string;
  isChecked: boolean;
}

function AddItem(props: AddItemProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name.trim() || !category.trim() || quantity < 1) {
      alert("Please fill in all required fields.");
      return;
    }

    const newItem: Item = {
      _id: new ObjectId().toHexString(),
      name: name.trim(),
      quantity,
      category: category,
      isChecked: false,
    };

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.authToken}`,
        },
        body: JSON.stringify(newItem),
      });

      if (!res.ok) throw new Error("Failed to add item.");

      const createdItem = await res.json();

      props.setItems([...props.items, createdItem]);
      props.onCloseRequested();
    } catch (err) {
      alert("Error adding item: " + (err as Error).message);
    }
  };

  return (
    <>
      <div id="container">
        <div>
          <div id="item-header">
            <input
              id="item-name-input"
              type="text"
              placeholder="Item Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div id="grocery-content">
            <label htmlFor="item-quantity">Quantity:</label>
            <input
              type="number"
              id="item-quantity"
              name="item-quantity"
              min="1"
              required
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />

            <label htmlFor="item-category">Category:</label>
            <select
              id="item-category"
              name="item-category"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="produce">Produce</option>
              <option value="meat">Meat</option>
              <option value="dairy">Dairy</option>
              <option value="frozen">Frozen</option>
              <option value="bakery">Bakery</option>
              <option value="other">Other</option>
            </select>

            <button
              onClick={handleSubmit}
              className="recipe-content-card-button"
            >
              Add Item
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddItem;
