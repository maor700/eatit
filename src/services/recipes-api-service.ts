import axios, { AxiosResponse } from "axios";

const API_KEY = `684f85811dff457da94a2ea48b7d03af`;
const KEY_PARAM = `?apiKey=${API_KEY}`;
const SPOONACULAR_URL = `https://api.spoonacular.com/`;

export const getRecipeFromIngredients = async (ingredients: string, recipeType: string) => {
    let url = `${SPOONACULAR_URL}recipes/complexSearch${KEY_PARAM}&includeIngredients=${ingredients}&type=${recipeType}&number=10`;
    return axios.get(url);
}

export const getRecipeInformation = async (recipeId: Number) => {
    let url = `${SPOONACULAR_URL}recipes/${recipeId}/information${KEY_PARAM}`;
    return axios.get(url);
}

type ingredientOption = { "name": string, "image": string }
export const searchIngredients = async (word: string, number?: number): Promise<AxiosResponse<ingredientOption[]>> => {
    let url = `${SPOONACULAR_URL}food/ingredients/autocomplete${KEY_PARAM}&query=${word}${number ? "&number=5" : ""}`;
    return axios.get(url);
}

export const getUrlImage = (url:string, size:100|200|300)=> `https://spoonacular.com/cdn/ingredients_${size}x${size}/${url}`;