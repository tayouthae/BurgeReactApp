import * as actionTypes from './actionTypes'
import axios from '../../axios-order'

export const addIngredient =(name)=>{
    return{
        type : actionTypes.ADD_INGREDIENT,
        ingredientName : name
    }
};

export const removeIngredient =(name)=>{
    return{
        type : actionTypes.REMOVE_INGREDIENT,
        ingredientName : name
    }
};  

export const setIngredient =(ingredients)=>{
    return{
        type : actionTypes.SET_INGREDIENTS,
        ingredients : ingredients,
    }
}

export const fethchIngredientFail =()=>{
    return{
        type : actionTypes.FETCH_INGREDIENT_FAILS,
        
    }
}



export const initIngredient = ()=>{
    return dispatch =>{
        axios
      .get("https://my-react-burger-a2d1e.firebaseio.com/ingredients.json")
      .then((response) => {
        dispatch(setIngredient(response.data))
      })
      .catch((error) => {
        dispatch(fethchIngredientFail());
      });
    }
}
