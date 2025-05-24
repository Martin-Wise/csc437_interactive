import './RecipeStyles.css';
import { useState } from 'react';

import Header from '../Header';
import Recipe from './Recipe';
import AddRecipe from './AddRecipe';
import Modal from './Modal';
import NewRecipeButton from './NewRecipeButton';

interface RecipesPageType {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Recipes {
  img: string;
  alt: string;
  name: string;
  ingredients: string;
  instructions: string;
}

function RecipesPage({isDark, setIsDark}: RecipesPageType) {
  const tempListRecipes = [
    {img: "/src/assets/pizza.jpeg", alt:"handmade pizza", name:"Pizza Recipe", ingredients:"Pizza ingredients", instructions:"Make the pizza"},
    {img: "/src/assets/spaghetti.jpeg", alt:"homemade spaghetti and meatballs", name:"Spaghetti Recipe", ingredients:"Spaghetti ingredients", instructions:"Make the spaghetti"},
    {img: "/src/assets/burrito.jpeg", alt:"several burritos cut in half", name:"Burrito Recipe", ingredients:"Burrito ingredients", instructions:"Make the burrito"},
  ]

  const [recipeList, setRecipeList] = useState<Recipes[]>(tempListRecipes);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  function onCloseRequested() {
    setModalIsOpen(false);
  }
  const filteredRecipes = recipeList.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.ingredients.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.instructions.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Modal
        headerLabel={"Add Recipe!"}
        isOpen={modalIsOpen}
        onCloseRequested={onCloseRequested}
      >
        <AddRecipe onCloseRequested={onCloseRequested} recipeList={recipeList} setRecipeList={setRecipeList}/>
      </Modal>
      <Header isDark={isDark} setIsDark={setIsDark}/>

      <main id="container">
        <div>
          <div id="recipe-header">Recipies</div>

          <div id="recipe-search">
            <input
              type="text"
              placeholder="Search.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div id="recipe-content">
            {filteredRecipes.map((recipe, idx) => (
              <Recipe
                  key={idx}
                  recipe={recipe}
              />
            ))}
          </div>
        </div>

        <NewRecipeButton setModalIsOpen={setModalIsOpen}/>
      </main>
    </>
  );
};

export default RecipesPage;
