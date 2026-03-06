import React, { useState, useEffect } from "react"

function IngredientSearch() {

    const [results, setResults] = useState([])
    const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY

    useEffect(() => {

        const input = document.querySelector('input[name="ingredient"]')
        if (!input) return

        const handleInput = async (e) => {

            const value = e.target.value

            if (value.length < 2) {
                setResults([])
                return
            }

            try {

                const res = await fetch(
                    `https://api.spoonacular.com/food/ingredients/search?query=${value}&number=6&apiKey=${API_KEY}`
                )

                const data = await res.json()
                setResults(data.results || [])

            } catch (err) {
                console.error("API error:", err)
            }
        }

        input.addEventListener("input", handleInput)

        return () => input.removeEventListener("input", handleInput)

    }, [API_KEY])

    function selectIngredient(name) {
        const input = document.querySelector('input[name="ingredient"]')
        input.value = name
        setResults([])
    }

    return (
        <ul className="ingredient-suggestions">

            {results.map(item => (

                <li
                    key={item.id}
                    onClick={() => selectIngredient(item.name)}
                >

                    <img
                        src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}
                        width="40"
                        alt={item.name}
                    />

                    <span>{item.name}</span>

                </li>

            ))}

        </ul>
    )
}

export default IngredientSearch