import {Recipe} from './recipe.model';

import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
      new Recipe(
        'The Best Pizza',
        'Crunchy pizza with the best toppings' ,
        'https://joyfoodsunshine.com/wp-content/uploads/2016/09/easy-pizza-casserole-recipe-5.jpg',
        [
          new Ingredient('Pizza Dough', 1),
          new Ingredient('Tomato Sauce', 1),
          new Ingredient('Mozarella', 2)
        ]),

      new Recipe(
        'Classic Burger',
        'A classic pub styles juicy burger' ,
        'https://www.hellmanns.nl/content/dam/unilever/global/recipe_image/678/67866-default.jpg/_jcr_content/renditions/cq5dam.web.500.330.jpeg',
        [
          new Ingredient('Minced Meat', 1),
          new Ingredient('Burger Buns', 2),
          new Ingredient('Lettuce', 1),
          new Ingredient('Tomato', 1),
          new Ingredient('American Cheese', 2)
        ]),

      new Recipe(
        'Steak with peppercorn sauce',
        'De best way to cook a steak!' ,
        'https://beefensteak.nl/media//catalog/product/cache/cat_resized/Flank-steak-32-categorie.jpg',
        [
          new Ingredient('Steak', 1),
          new Ingredient('Cream', 2),
          new Ingredient('Peppercorn', 1),
          new Ingredient('Thyme', 1),
        ]),

      new Recipe(
        'Spaghetti bolognese',
        'The absolute best way of having spaghetti' ,
        'https://makkelijkafvallen.nl/wp-content/uploads/1024x800-recept-voor-koolhydraatarme-spaghetti-bolognese-saus_cr-3.jpg',
        [
          new Ingredient('Spaghetti', 1),
          new Ingredient('Tomato', 2),
          new Ingredient('Minced meat', 1),
          new Ingredient('Cheese of your choice', 1),
          new Ingredient('Basil', 2)
        ]),

      new Recipe(
        'Multi-layer lasagne',
        'Creamy cheesy pasta with a bolognese sauce' ,
        'data:image/jpeg;base64,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',
        [
          new Ingredient('Minced Meat', 1),
          new Ingredient('Tomato', 2),
          new Ingredient('Pasta sheets', 1),
          new Ingredient('Basil', 1),
          new Ingredient('Mozarella', 2)
        ]),

      new Recipe(
        'Pumpkin soup',
        'A warm bowl of soup for cold winter days' ,
        'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/DBB09B22-F1C0-47D9-A8B6-D4673AD750FD/Derivates/98FB7DCF-AD44-4D68-B437-BCD91AF07F5A.jpg',
        [
          new Ingredient('Pumpkin', 1)
        ]),
  ];

    constructor(private slService: ShoppingListService) {
    }

    getRecipes() {
      return this.recipes.slice();
    }

    getRecipe(index: number) {
      return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.slService.addIngredientsToSL(ingredients);
    }

    addRecipe(recipe: Recipe){
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }
}
