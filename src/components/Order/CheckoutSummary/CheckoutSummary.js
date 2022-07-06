import React from "react";
import Button from "../../UI/Button/Button";
import Burger from "../../Burger/Burger";
import classes from "./CheckoutSummary.module.css";

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1> We hope it tests well</h1>
      <div style={{ width: "300px", height: "300px", margin: "auto" }}>
        <Burger ingredient={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.clickedCancel}>
        CANCLE
      </Button>
      <Button btnType="Success" clicked={props.clickedContinue}>
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;
