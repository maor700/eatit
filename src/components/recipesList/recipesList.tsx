import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useState } from 'react';
import { FcClock, FcLike } from 'react-icons/fc';
import { eatitDB } from '../../DB/DB';
import { getRecipeDetailsUrl } from '../../services/recipes-api-service';
import './recipesList.css';

type RecipesListProps = {
    recipes: any
}

export const RecipesList: React.FC<RecipesListProps> = function () {
    const recipes = useLiveQuery(() => { return eatitDB.recipes.toArray() }, [], []);
    const finalRecepise = useState([]);
    useEffect(() => {
        const arr = [];
        Promise.allSettled(recipes?.map(async (r) => {
            return await fetch(getRecipeDetailsUrl(r.id + "")).then(res => res.json());
        })).then((allInfo) => {
            const allData = allInfo.filter(_ => _.status === "fulfilled").map((_: any) => _?.value);
            console.log(allInfo);
            eatitDB.recipes.bulkPut(allData);
        })
    }, [])
    return (
        <>
            <div className="recipes-title">We found some recipes for you !</div>
            {recipes.map((recipe: any) => <div className="recipes-list-container">
                <div className="card-recipe">
                    <div className="recipe-img" style={{ background: `url(${recipe.image})` } as any}></div>
                    <div className="recipe-data">
                        <a href={recipe?.sourceUrl}>
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