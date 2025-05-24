interface NewItemButtonType {
  setModalIsOpen: (isOpen: boolean) => void 
}

function NewItemButton (props : NewItemButtonType) {
  return (
    <div id="list-new-item">
      <button onClick={() => {props.setModalIsOpen(true)}} className="circle-link">+</button>
    </div>
  );
};

export default NewItemButton;
