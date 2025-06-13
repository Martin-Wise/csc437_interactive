import './RecipeStyles.css';
import { useEffect, useState } from 'react';
import Recipe from './Recipe';
import AddRecipe from './AddRecipe';
import Modal from './Modal';
import NewRecipeButton from './NewRecipeButton';

interface Ingredient {
  name: string;
  quantity: number;
  category: string;
  isChecked: boolean;
}

interface Recipes {
  _id: string;
  name: string;
  ingredients: Ingredient[];
  instructions: string;
}

interface RecipePagePropsType {
  authToken: string;
}

function RecipesPage({ authToken }: RecipePagePropsType) {
  const [recipeList, setRecipeList] = useState<Recipes[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    fetch("/api/recipes", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch recipes.");
        return res.json();
      })
      .then((data) => {
        setRecipeList(data);
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

  const filteredRecipes = recipeList.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.instructions.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <>
      <Modal
        headerLabel={"Add Recipe!"}
        isOpen={modalIsOpen}
        onCloseRequested={onCloseRequested}
      >
        <AddRecipe
          onCloseRequested={onCloseRequested}
          recipeList={recipeList}
          setRecipeList={setRecipeList}
          authToken={authToken}
        />
      </Modal>

      <main id="container">
        <div>
          <div id="recipe-header">Recipes</div>

          <div id="recipe-search">
            <input
              type="text"
              placeholder="Search.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div id="recipe-content">
            {loading && <p>Loading recipes...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && filteredRecipes.map((recipe, idx) => (
              <Recipe
                key={idx}
                recipe={recipe}
                authToken={authToken}
                setRecipeList={setRecipeList}
              />
            ))}
          </div>
        </div>

        <NewRecipeButton setModalIsOpen={setModalIsOpen} />
      </main>
    </>
  );
}

export default RecipesPage;
