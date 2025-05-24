import React from 'react';
import './GroceryList.css';
import Header from '../Header';
import ItemList from './ItemList';
import NewItemButton from './NewItemButton';
import Modal from './Modal';
import AddItem from './AddItem';
import { useState } from 'react';

interface Item {
  name: string;
  quantity: number;
  category: string;
  isChecked: boolean;
};

interface GroceryListType {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

function GroceryList({isDark, setIsDark} : GroceryListType){
  const testItems = [
    {name: "Tomato", quantity: 2, category: "Produce", isChecked: false},
    {name: "Apple", quantity: 3, category: "Produce", isChecked: true},
    {name: "Penne Pasta", quantity: 2, category: "Other", isChecked: false},
  ]

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [items, setItems] = useState<Item[]>(testItems);
  
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
        <AddItem onCloseRequested={onCloseRequested} items={items} setItems={setItems}/>
      </Modal>
      <Header isDark ={isDark} setIsDark={setIsDark}/>
      <div id="container">
        <ItemList items = {items} setItems = {setItems}/>
        <NewItemButton setModalIsOpen = {setModalIsOpen}/>
      </div>
    </>
  );
};

export default GroceryList;
