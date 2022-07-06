import React from "react";
import classes from "./Order.module.css";

const order = (props) => {
  const ingredients = [];
  for (let ingredientName in props.ingrediets) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingrediets[ingredientName],
    });
  }

  const ingredientOutput = ingredients.map((item) => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          padding: "5px",
        }}
        key={item.name}
      >
        {item.name} ({item.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>INGREDIENTS : {ingredientOutput} </p>
      <p>
        PRICE : <strong>USD {props.pirce}</strong>
      </p>
    </div>
  );
};

export default order;
