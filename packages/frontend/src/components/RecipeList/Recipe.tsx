import { useState } from "react";
import Modal from "./Modal";
import { ObjectId } from 'bson'
import './AddRecipeStyles.css';

interface Ingredient {
  name: string;
  quantity: number;
  category: string;
  isChecked: boolean;
}

interface Recipe {
  _id?: string;
  name: string;
  ingredients: Ingredient[];
  instructions: string;
}

interface RecipePropType {
    recipe: Recipe;
    authToken: string;
    setRecipeList: any;
    }

function Recipe({ recipe, authToken,setRecipeList }: RecipePropType) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  function openModal() {
    setModalOpen(true);
    setStatusMessage(null);
  }

  function closeModal() {
    setModalOpen(false);
  }

  async function handleDeleteRecipe() {
    try {
      const response = await fetch(`/api/recipes/${recipe._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ name: recipe._id }), // or use _id if available
      });

      if (response.ok) {
        setStatusMessage("Recipe deleted.");
        setRecipeList((prevList: any[]) => prevList.filter((r: { _id: string | undefined; }) => r._id !== recipe._id));
        closeModal();
      } else {
        setStatusMessage("Failed to delete recipe.");
      }
    } catch (err) {
      console.error(err);
      setStatusMessage("An error occurred while deleting.");
    }
  }

  async function handleAddToList() {
    try {
      const responses = await Promise.all(
        recipe.ingredients.map(ingredient =>
          fetch("/api/items", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
              _id: new ObjectId().toHexString(),
              name: ingredient.name,
              quantity: ingredient.quantity,
              category: ingredient.category,
              isChecked: ingredient.isChecked ?? false,
            }),
          })
        )
      );

      const allSucceeded = responses.every(res => res.ok);
      setStatusMessage(allSucceeded ? "Items added to your grocery list!" : "Some items failed to add.");
    } catch (error) {
      console.error("Add to list failed:", error);
      setStatusMessage("An error occurred while adding items.");
    }
  }

  return (
    <>
      <div className="recipe-content-card" key={recipe.name}>
        <button className="recipe-content-card-button" onClick={openModal}>
          {recipe.name}
        </button>
      </div>

      <Modal isOpen={isModalOpen} onCloseRequested={closeModal} headerLabel={recipe.name}>
        <div id="container-add">
          <div>
            <div id="item-header-add">
              <h2 id="recipe-name-input-add" style={{ marginTop: "1rem" }}>
                {recipe.name}
              </h2>
            </div>

            <div id="recipe-content-add">
              <label>Ingredients</label>
              <div className="readonly-box">
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index}>
                    {ingredient.name} - {ingredient.quantity} ({ingredient.category})
                  </div>
                ))}
              </div>

              <button
                className="recipe-content-card-button"
                onClick={handleAddToList}
                style={{ marginTop: "1rem" }}
              >
                Add to List
              </button>

              <label>Instructions</label>
              <div className="readonly-box">{recipe.instructions}</div>

              <button
                className="recipe-content-card-button"
                onClick={handleDeleteRecipe}
                style={{ marginTop: "1rem", backgroundColor: "tomato", color: "white" }}
              >
                Remove Recipe
              </button>

              {statusMessage && (
                <p style={{ marginTop: "0.5rem", color: "green" }}>{statusMessage}</p>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Recipe;
