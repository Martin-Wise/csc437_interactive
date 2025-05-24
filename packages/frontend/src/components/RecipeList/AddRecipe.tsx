import { useState } from "react";
import './AddRecipeStyles.css'

interface Recipe {
  img: string;
  alt: string;
  name: string;
  ingredients: string;
  instructions: string;
}

interface AddRecipeProps {
  recipeList: Recipe[];
  setRecipeList: React.Dispatch<React.SetStateAction<Recipe[]>>;
  onCloseRequested: React.Dispatch<React.SetStateAction<void>>;
}

function AddRecipe(props: AddRecipeProps) {
  // const [img, setImg] = useState('');
  const img = "/src/assets/pizza.jpeg";
  // const [alt, setAlt] = useState('Homemade Pizza');
  const alt = "Homemade Pizza";
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !img.trim() ||
      !alt.trim() ||
      !name.trim() ||
      !ingredients.trim() ||
      !instructions.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const newRecipe: Recipe = {
      img: img.trim(),
      alt: alt.trim(),
      name: name.trim(),
      ingredients: ingredients.trim(),
      instructions: instructions.trim(),
    };
    props.setRecipeList([...props.recipeList, newRecipe]);
    props.onCloseRequested();
  };

  return (
    <div id="container-add">
      <div>
        <div id="item-header-add">
          <div id="item-header-img-wrapper">
            <img src={img} alt={alt} />
          </div>
          <input
            id="recipe-name-input-add"
            type="text"
            placeholder="Recipe Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div id="recipe-content-add">
          <label htmlFor="recipe-ingredients">Ingredients</label>
          <textarea
            id="recipe-ingredients"
            placeholder="List ingredients here..."
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          ></textarea>

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
