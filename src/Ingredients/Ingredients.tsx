import { FC, useCallback } from "react";
import { InputField } from "../FormElements/InputField";
import "./Ingredients.less";

export const Ingredients: FC<any> = (props) => {
    const searchIngredients = useCallback((value: string) => {
    }, []);
    return (
        <div className="ing-con">
            <h2>Ingridents</h2>
            <div className="field-group add-input">
                <input placeholder="some ingredient" type="text" className="field input" />
                <button className="btn">add</button>
            </div>
            <InputField previewMode isSearchInput />
            <InputField previewMode />
            <InputField previewMode />
            <InputField previewMode />
            <button className="btn wide">Add recipe</button>
        </div>
    );
}