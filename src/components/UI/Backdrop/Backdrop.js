import React from "react";
import classes from "./Backdrop.module.css";

const backdrop = (porps) =>
  porps.show ? (
    <div className={classes.Backdrop} onClick={porps.removeModal}></div>
  ) : null;

export default backdrop;
