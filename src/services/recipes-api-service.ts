import axios from "axios";

export const getRecipeFromIngredients = (ingredients: string, recipeType: string) => {
    let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=684f85811dff457da94a2ea48b7d03af&includeIngredients=${ingredients}&type=${recipeType}&number=10`;
    axios.get(url).then(response => {
        return response;
    }, (error) => {
        console.log(error);
    });
}

export const getRecipeInformation = (recipeId: Number) => {
    let url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=684f85811dff457da94a2ea48b7d03af`;
    axios.get(url).then(response => {
        return response;
    }, (error) => {
        console.log(error);
    });
}