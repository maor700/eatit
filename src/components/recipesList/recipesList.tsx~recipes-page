import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo, useState } from 'react'
import { FcClock, FcLike } from 'react-icons/fc';
import { eatitDB } from '../../DB/DB';
import { getRecipeDetailsUrl } from '../../services/recipes-api-service';
import './recipesList.css';

type RecipesListProps = {
    recipes: any
}

const RecipesList: React.FC<RecipesListProps> = function () {
    const recipes = useLiveQuery(() => { return eatitDB.recipes.toArray() }, [], []);
    return (
        <>
            <div className="recipes-title">We found some recipes for you !</div>
            {recipes.map((recipe: any) => <div className="recipes-list-container">
                <div className="card-recipe">
                    <div className="recipe-img" style={{ background: `url(${recipe.image})` } as any}></div>
                    <div className="recipe-data">
                        <div onClick={()=>{
                            fetch(getRecipeDetailsUrl(recipe.id)).then(res=>res.json()).then(({sourceUrl}:any)=>{
                                location.assign(sourceUrl);
                            })
                        }}>
                            <div className="title">{recipe.title}</div>
                        </div>
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
