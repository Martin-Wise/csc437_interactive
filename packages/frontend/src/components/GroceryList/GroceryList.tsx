import './GroceryList.css';
import ItemList from './ItemList';
import NewItemButton from './NewItemButton';
import Modal from './Modal';
import AddItem from './AddItem';
import { useEffect, useState } from 'react';

interface Item {
  _id: string
  name: string;
  quantity: number;
  category: string;
  isChecked: boolean;
}

interface GroceryListPropType {
  authToken: string
}

function GroceryList({authToken} : GroceryListPropType) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/items", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch items.");
        return res.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  function onCloseRequested() {
    setModalIsOpen(false);
  }

  return (
    <>
      <Modal
        headerLabel={"Add Item!"}
        isOpen={modalIsOpen}
        onCloseRequested={onCloseRequested}
      >
        <AddItem
          onCloseRequested={onCloseRequested}
          items={items}
          setItems={setItems}
          authToken={authToken}
        />
      </Modal>
      <div id="container">
        {loading && <p>Loading items...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
          <>
            <ItemList items={items} setItems={setItems} authToken={authToken}/>
            <NewItemButton setModalIsOpen={setModalIsOpen} />
          </>
        )}
      </div>
    </>
  );
}

export default GroceryList;
