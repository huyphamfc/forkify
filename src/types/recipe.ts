import type Ingredient from './ingredient';

export default interface Recipe {
  id: string;
  title: string;
  publisher: string;
  sourceUrl: string;
  imgUrl: string;
  servings: number;
  cookingTime: number;
  ingredients: Ingredient[];
}
