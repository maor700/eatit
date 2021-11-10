export class Recipe {
    id!: number;
    title!: string;
    image!: string;
    imageType!: string;
    nutrition!: Nutrient[];
}

export interface Nutrient {
    title: string;
    name: string;
    amount: number;
    unit: string;
}
