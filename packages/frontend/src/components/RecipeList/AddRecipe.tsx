import { useState } from "react";
import './AddRecipeStyles.css';
import { ObjectId } from 'bson';

interface Ingredient {
  name: string;
  quantity: number;
  category: string;
  isChecked: boolean;
}

interface Recipe {
  _id: string;
  name: string;
  ingredients: Ingredient[];
  instructions: string;
}

interface AddRecipeProps {
  recipeList: Recipe[];
  setRecipeList: React.Dispatch<React.SetStateAction<Recipe[]>>;
  onCloseRequested: React.Dispatch<React.SetStateAction<void>>;
  authToken: string;
}

function AddRecipe(props: AddRecipeProps) {
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);
  const [ingredientInput, setIngredientInput] = useState({
    name: "",
    quantity: 1,
    category: ""
  });

  const addIngredient = () => {
    if (!ingredientInput.name.trim() || !ingredientInput.category.trim()) return;

    const newIngredient: Ingredient = {
      ...ingredientInput,
      isChecked: false
    };

    setIngredientList([...ingredientList, newIngredient]);
    setIngredientInput({ name: "", quantity: 1, category: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!name.trim() || ingredientList.length === 0 || !instructions.trim()) {
      alert("Please complete all fields including at least one ingredient.");
      return;
    }
  
    const newRecipe: Recipe = {
      _id: new ObjectId().toHexString(),
      name: name.trim(),
      ingredients: ingredientList,
      instructions: instructions.trim(),
    };
  
    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.authToken}`,
        },
        body: JSON.stringify(newRecipe),
      });
  
      if (!response.ok) {
        throw new Error("Failed to save recipe");
      }
  
      const savedRecipe = await response.json();
      props.setRecipeList([...props.recipeList, savedRecipe]);
      props.onCloseRequested();
    } catch (error) {
      alert("Error saving recipe: " + (error as Error).message);
    }
  };
  

  return (
    <div id="container-add">
      <div>
        <div id="item-header-add">
          <input
            id="recipe-name-input-add"
            type="text"
            placeholder="Recipe Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div id="recipe-content-add">
          <label>Ingredient Name</label>
          <input
            type="text"
            value={ingredientInput.name}
            onChange={(e) => setIngredientInput({ ...ingredientInput, name: e.target.value })}
          />

          <label>Quantity</label>
          <input
            type="number"
            value={ingredientInput.quantity}
            onChange={(e) => setIngredientInput({ ...ingredientInput, quantity: Number(e.target.value) })}
          />

          <label>Category</label>
          <input
            type="text"
            value={ingredientInput.category}
            onChange={(e) => setIngredientInput({ ...ingredientInput, category: e.target.value })}
          />

          <button type="button" onClick={addIngredient}>Add Ingredient</button>

          <ul>
            {ingredientList.map((ing, index) => (
              <li key={index}>
                {ing.name} - {ing.quantity} ({ing.category})
              </li>
            ))}
          </ul>

          <label htmlFor="recipe-instructions">Instructions</label>
          <textarea
            id="recipe-instructions"
            placeholder="Describe the steps here..."
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          ></textarea>
        </div>

        <button className="recipe-content-card-button" onClick={handleSubmit}>
          Add Recipe
        </button>
      </div>
    </div>
  );
}

export default AddRecipe;
