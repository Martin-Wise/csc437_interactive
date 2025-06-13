import Item from './Item'

interface ItemType {
    _id: string;
    name: string;
    quantity: number;
    category: string;
    isChecked: boolean;
};

interface ItemListType {
    items: ItemType[];
    setItems: React.Dispatch<React.SetStateAction<ItemType[]>>;
    authToken: string
}

function ItemList({items, setItems, authToken} : ItemListType) {

const toggleItemCheck = (index: number) => {
    const newItems = [...items];
    newItems[index].isChecked = !newItems[index].isChecked;
    setItems(newItems);
};

const removeItem = async (index: number) => {
  const itemToRemove = items[index];
  try {
    console.log("id: -:>>" + itemToRemove._id);
    const response = await fetch(`/api/items/${itemToRemove._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) throw new Error("Failed to delete item");

    const newItems = items.filter((_, idx) => idx !== index);
    setItems(newItems);
  } catch (err) {
    alert("Error deleting item: " + (err as Error).message);
  }
};

      
  return (
    <div id="list">
      <div id="list-header">
        Grocery List
      </div>
      <div id="list-items">
        {items.map((item, idx) => (
        <div key={idx} className="list-item-container">
          <Item
              item={item}
              toggleCheck={() => toggleItemCheck(idx)}
          />
          <button 
            className="delete-button"
            onClick={() => removeItem(idx)}
            aria-label="Remove item"
          >
            ×
          </button>
        </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;