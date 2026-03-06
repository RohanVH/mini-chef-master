import addGif from '../assets/img/add.gif'
import addIngredients from '../assets/img/vegetables.gif'
import React from 'react'
import IngredientSearch from './IngredientSearch'
import IngredientItem from './IngredientItem'

function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [inputValue, setInputValue] = React.useState('')
    const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY

    const ingredientsListItems = ingredients.map((ingredient, index) => (
        <IngredientItem
            key={index}
            name={ingredient.name}
            image={ingredient.image}
            onDelete={() => {
                setIngredients(prevIngredients =>
                    prevIngredients.filter((_, i) => i !== index)
                )
            }}
        />
    ))
    const addItems = async (e) => {
        e.preventDefault();
        const newIngredient = inputValue.trim();
        if (!newIngredient) return;

        try {
            const res = await fetch(
                `https://api.spoonacular.com/food/ingredients/search?query=${newIngredient}&number=1&apiKey=${API_KEY}`
            );
            const data = await res.json();
            const image = data.results && data.results[0] ? 
                `https://spoonacular.com/cdn/ingredients_100x100/${data.results[0].image}` : null;
            setIngredients(prev => [...prev, { name: newIngredient, image }]);
        } catch (err) {
            console.error("Error fetching ingredient image:", err);
            setIngredients(prev => [...prev, { name: newIngredient, image: null }]);
        }
        setInputValue('');
    }
    return (
        <main >
            <div className="main-heading">
                <h1 className="subheader">Welcome to Mini Chef!</h1>
                <span id="subline">
                    <p>Discover delicious recipes and cooking tips to elevate your culinary skills.</p>
                </span>
            </div>
            <div className="content">
                <h1>Add Ingredients</h1>
                <img src={addIngredients} alt="Add Ingredients" />
                <br />
                <h3>Add ingredients you have on hand</h3>
                <br />
                <form onSubmit={addItems} className="add-ingredient-form">
                    <input
                        type="text"
                        placeholder="e.g. oregano"
                        aria-label="Add ingredient"
                        name='ingredient'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button>
                        <img src={addGif} alt="Add ingredient" id="add-icon" />
                    </button>
                </form>
                {inputValue && (
                <div id="suggestions">
                    <span >
                        Suggestions:
                    </span>
                <IngredientSearch />
                </div>
                )}
                
                <div id='text-bar'>
                    <h3 className='item-list'><u>Ingredients You Added </u></h3>
                </div>
                <ul>
                    {ingredientsListItems}
                </ul>

            </div>
        </main>
    )
}
export default Main