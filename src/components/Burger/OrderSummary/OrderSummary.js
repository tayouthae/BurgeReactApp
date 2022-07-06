import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredient).map((item) => {
    return (
      <li key={item}>
        <span style={{ textTransform: "capitalize" }}>{item}</span>:
        {props.ingredient[item]}
      </li>
    );
  });
  return (
    <Auxiliary>
      <h3>Your Order</h3>
      <p> A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <h3>
        Total Price :<strong>{props.totalPriceInOrder}</strong>
      </h3>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.purchasedCancel}>
        CANCLE
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinue}>
        CONTINUE
      </Button>
    </Auxiliary>
  );
};

export default OrderSummary;
