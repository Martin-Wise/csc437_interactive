import Item from './Item'

interface ItemType {
    name: string;
    quantity: number;
    category: string;
    isChecked: boolean;
};

interface ItemListType {
    items: Item[];
    setItems:  React.Dispatch<React.SetStateAction<ItemType[]>>;
}

function ItemList({items, setItems} : ItemListType) {

const toggleItemCheck = (index: number) => {
    const newItems = [...items];
    newItems[index].isChecked = !newItems[index].isChecked;
    setItems(newItems);
};
      
  return (
    <div id="list">
      <div id="list-header">
        <button className="list-nav">{'<'}</button>
        Current List
        <button className="list-nav">{'>'}</button>
      </div>
      <div id="list-items">
        {items.map((item, idx) => (
        <Item
            key={idx}
            item={item}
            toggleCheck={() => toggleItemCheck(idx)}
        />
        ))}
      </div>
    </div>
  );
};

export default ItemList;
