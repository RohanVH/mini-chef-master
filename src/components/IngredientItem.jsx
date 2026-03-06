import React from "react"

function IngredientItem({ name, image, onDelete }) {

    return (
        <li className="ingredient-item">
            {image ? (
                <img 
                    src={image} 
                    alt={name} 
                    className="ingredient-image" 
                />
            ) : (
                <div className="ingredient-placeholder"></div>
            )}
            <span>{name}</span>
            <button className="delete-btn" onClick={onDelete}>
                x
            </button>
        </li>
    )
}

export default IngredientItem