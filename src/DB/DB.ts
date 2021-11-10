import Dexie, { Table } from 'dexie';
import { Ingredient } from './models/Ingredient';
import { Recipe } from './models/Recipe';
import { State, StateKeys } from './models/state';

const DB_NAME = "eatit";
const INGREDIENTS_TABLE_NAME = "ingredients";
const RECIPES_TABLE_NAME = "recipes";
const STATE_TABLE_NAME = "app";

export class EatItDB extends Dexie {
    state!: Table<State>;
    ingredients!: Table<Ingredient>;
    recipes!: Table<Recipe>;

    constructor() {
        super(DB_NAME);
        this.version(1).stores({
            [INGREDIENTS_TABLE_NAME]: `&name`,
            [RECIPES_TABLE_NAME]: `&id, title`,
            [STATE_TABLE_NAME]: "&key, value",
        });

        this.ingredients = this.table(INGREDIENTS_TABLE_NAME) as any;
        this.recipes = this.table(RECIPES_TABLE_NAME) as any;
        this.state = this.table(STATE_TABLE_NAME) as any;
        this.ingredients.mapToClass(Ingredient);
        this.recipes.mapToClass(Recipe);
        this.state.mapToClass(State);
    }

    // app table utils

    getAppPropColl = (propName: StateKeys) => {
        return this.state.where("key").equals(propName);
    }
    getAppPropVal = async<T = any>(propName: StateKeys) => {
        return ((await this.getAppPropColl(propName).first())?.value) as Promise<T>
    }

    setAppPropVal = async<T = any>(propName: StateKeys, value: T) => {
        const propExist = !!(await this.getAppPropColl(propName).first());
        if (propExist) {
            return !!((await this.getAppPropColl(propName).modify({ value })))
        } else {
            return !!(await this.state.add({ key: propName, value }))
        }
    }
}

export const eatitDB = new EatItDB();

console.log(eatitDB);
