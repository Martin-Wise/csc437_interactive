
interface RecipePropType {
    recipe: RecipeType;
}

interface RecipeType {
    img: string;
    alt: string;
    name: string;
    ingredients: string;
    instructions: string;
  }

function Recipe({ recipe } : RecipePropType) {
    return (<div className="recipe-content-card" key={recipe.name}>
        <div className="recipe-content-card-imgwrapper">
            <img src={recipe.img} alt={recipe.alt} />
        </div>
        <button className="recipe-content-card-button">{recipe.name}</button>
    </div>);
}

export default Recipe;