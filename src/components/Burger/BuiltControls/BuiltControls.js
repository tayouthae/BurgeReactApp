import React from "react";
import classes from "./BuiltControls.module.css";
import BuiltControl from "./BuiltControl/BuiltControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const builtControl = (props) => {
  return (
    <div className={classes.BuiltControls}>
      <p>
        Current Price <strong> {props.price.toFixed(2)}</strong>
      </p>

      {controls.map((item, index) => {
        // console.log(item);
        return (
          <BuiltControl
            key={item.label}
            label={item.label}
            added={() => props.ingredientAdded(item.type)}
            removed={() => props.ingredientRemoved(item.type)}
            disabled={props.disabled[item.type]}
          />
        );
      })}

      <button
        className={classes.OrderButton}
        disabled={!props.purchabele}
        onClick={props.ordered}
      >
        {props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}
      </button>
    </div>
  );
};

export default builtControl;
