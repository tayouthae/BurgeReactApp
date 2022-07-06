import React from "react";
import classes from "./Logo.module.css";
import burgerLogo from "../../assets/Images/burger-logo.png";

const logo = (props) => (
  <div
    className={classes.Logo}
    style={{ height: props.height, margineBottom: props.margineBottom }}
  >
    <img className={classes.img} src={burgerLogo} alt="MyBurger" />
  </div>
);

export default logo;
