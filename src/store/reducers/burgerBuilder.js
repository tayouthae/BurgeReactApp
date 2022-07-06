import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../Shared/untility";

const initialState = {
  ingredient: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGEREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const updatedIngredient = {
        [action.ingredientName]: state.ingredient[action.ingredientName] + 1,
      };
      const updatedIngredients = updateObject(
        state.ingredient,
        updatedIngredient
      );
      const updatedState = {
        ingredient: updatedIngredients,
        totalPrice:
          state.totalPrice + INGEREDIENT_PRICES[action.ingredientName],
        building: true,
      };
      return updateObject(state, updatedState);
    case actionTypes.REMOVE_INGREDIENT:
      const updatedIngredt = {
        [action.ingredientName]: state.ingredient[action.ingredientName] - 1,
      };
      const updatedIngredts = updateObject(state.ingredient, updatedIngredt);
      const updatedSta = {
        ingredient: updatedIngredts,
        totalPrice:
          state.totalPrice - INGEREDIENT_PRICES[action.ingredientName],
        building: true,
      };
      return updateObject(state, updatedSta);
    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredient: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        totalPrice: 4,
        error: false,
        building: false,
      });
    case actionTypes.FETCH_INGREDIENT_FAILS:
      return updateObject(state, { error: true });

    default:
  }
  return state;
};

export default reducer;
