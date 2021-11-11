import { liveQuery } from "dexie";
import { searchIngredients } from "../services/recipes-api-service";
import { eatitDB } from "./DB";
import { getIngredientsFromImage } from "../services/vision-api-service";

export const addIngredientsToDb = async (tags: string[]) => {
    const ingredients = await tagsToIngredients(tags);
    await eatitDB.ingredients.bulkPut((await ingredients).flat())
}

const tagsToIngredients = async (tags: string[]) => {
    const setteledRes = await Promise.allSettled(tags.filter(_ => _).map(async (tag) => (await (await searchIngredients(tag)).data)));
    const ingredients = setteledRes.filter(({ status, value }: any) => status === "fulfilled" && value?.[0]).map(({ value }: any) => value?.[0]);
    return ingredients;
};

liveQuery(() => eatitDB.getAppPropVal("tags"))
    .subscribe(async (tags: any) => {
        eatitDB.ingredients.clear();
        await addIngredientsToDb(tags);
    });

liveQuery(() => eatitDB.getAppPropVal("image"))
    .subscribe(async (image: string) => {
        debugger;
        getIngredientsFromImage(image).then(() => {
            debugger;
        });
    });