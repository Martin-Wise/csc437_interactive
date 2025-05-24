interface NewRecipeButtonType {
  setModalIsOpen: (isOpen: boolean) => void;
}

function NewRecipeButton(props: NewRecipeButtonType) {
  return (
    <div id="list-new-item">
      <button
        onClick={() => {
          props.setModalIsOpen(true);
        }}
        className="circle-link"
      >
        +
      </button>
    </div>
  );
}

export default NewRecipeButton;
