import { useLiveQuery } from "dexie-react-hooks";
import { FC, useCallback, useState } from "react";
import { addIngredientsToDb } from "../../DB/controller";
import { eatitDB } from "../../DB/DB";
import { InputField, Option } from "../FormElements/InputField";
import { searchIngredients, getRecipeFromIngredients } from "../../services/recipes-api-service";
import "./Ingredients.less";

export const Ingredients: FC<any> = (props) => {
    const [addVal, setAddVal] = useState("");
    const ingredients = useLiveQuery(async () => eatitDB.ingredients.toArray(), [], []);

    const onSelection = async ({ value, image }: Option, oldSelected: Option) => {
        eatitDB.transaction("rw", eatitDB.ingredients, async () => {
            oldSelected.value && await eatitDB.ingredients.delete(oldSelected.value);
            value && await eatitDB.ingredients.add({ name: value, image: image ?? "" });
        })
    }

    const getOptions = useCallback(async (word: string): Promise<Option[]> => {
        const { data } = await searchIngredients(word, 10);
        const options = data.map<Option>(({ name, image }) => ({ value: name, label: name, image }));;
        return options;
    }, []);

    const removeHandler = (option: Option) => {
        eatitDB.ingredients.delete(option.value);
    }

    const searchHandler = () => {
    }

    return (
        <div className="ing-con">
            <h2>Ingridents</h2>
            <InputField editModeOnly onRemove={removeHandler} onSelectOption={onSelection} previewMode isSearchInput getOptions={getOptions}>
                <button onClick={() => { addIngredientsToDb([addVal]) }} className="btn">add</button>
            </InputField>
            {ingredients?.map(({ name, image }) => {
                return <InputField onRemove={removeHandler} key={name} onSelectOption={onSelection} selected={{ value: name, image, label: name }} previewMode isSearchInput getOptions={getOptions} />
            })}
            <button className="btn wide" onClick={searchHandler}>Search recipe</button>
        </div>
    );
}