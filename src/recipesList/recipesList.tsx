import { useState } from 'react'
import logo from '../assets/eatit.png';
import * as ReactDOM from "react-dom";
import { Routes, Route, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import './recipesList.css'
import { FcClock, FcLike } from 'react-icons/fc';

type RecipesListProps = {
    recipes: any
}

const RecipesList: React.FC<RecipesListProps> = function ({ recipes }: RecipesListProps) {
    const [count, setCount] = useState(0)

    return (
        <>
        <div className="recipes-title">We found some recipes for you !</div>
        {recipes.map((recipe:any) => <div className="recipes-list-container">
            <div className="card-recipe">
                <div className="recipe-img" style={{ background: `url(${recipe.image})` } as any}></div>
                <div className="recipe-data">
                <a href={recipe.sourceUrl}>           
                    <div className="title">{recipe.title}</div>
                    </a>
                    <div className="credits">
                        By: {recipe.creditsText}
                    </div>
                    <div className="icons-container">
                        <div >
                            <FcClock />
                            <span className="icon">{recipe.readyInMinutes} Min</span>
                        </div>
                        <div className="icon">
                            <FcLike />
                            <span className="icon">{recipe.aggregateLikes} Likes</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )}
        </>
    )
}

export default RecipesList
