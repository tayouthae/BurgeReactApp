import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

const burger = (props) => {
  let transformedIngredient = Object.keys(props.ingredient)
    .map((igKey) => {
      // console.log(Object.keys(props.ingredient));
      // console.log(igKey);
      // console.log(props.ingredient[igKey]);
      // console.log([Array(props.ingredient[igKey])]);
      // console.log([Array(props.ingredient[igKey])].length);
      // console.log([...Array(props.ingredient[igKey])]);
      return [...Array(props.ingredient[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  //console.log(transformedIngredient);
  if (transformedIngredient.length === 0) {
    transformedIngredient = <p>Insert some item's</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredient}
      <BurgerIngredient type="bread-buttom" />
    </div>
  );
};

export default burger;
