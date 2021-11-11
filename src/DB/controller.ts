import { liveQuery } from "dexie";
import { searchIngredients } from "../services/recipes-api-service";
import { eatitDB } from "./DB";

export const addIngredientsToDb = async (tags: string[]) => {
    const ingredients = await tagsToIngredients(tags);
    await eatitDB.ingredients.bulkPut((await ingredients).flat())
}

const tagsToIngredients = async (tags: string[]) => {
    const setteledRes = await Promise.allSettled(tags.map(async (tag) => (await (await searchIngredients(tag)).data)));
    const ingredients = setteledRes.filter(({ status }) => status === "fulfilled").map(({ value }: any) => value?.[0]);
    return ingredients;
};

liveQuery(() => eatitDB.getAppPropVal("tags"))
    .subscribe(async(tags) => {
        eatitDB.ingredients.clear();
        await addIngredientsToDb(tags);
    });