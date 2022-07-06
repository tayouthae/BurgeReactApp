import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import axios from "../../../axios-order";
import { updateObject, checkValidity } from "../../../Shared/untility";
import * as actions from "../../../store/actions/index";

class ContactData extends Component {
  state = {
    orderFrom: {
      name: {
        elemetType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elemetType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elemetType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Zip Code",
        },
        value: "",
        validation: {
          required: true,
          maxLength: 5,
          minLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elemetType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elemetType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elemetType: "select",
        elementConfig: {
          options: [
            {
              value: "fastest",
              displayValue: "Fastest",
            },
            {
              value: "Cheapest",
              displayValue: "Cheapest",
            },
          ],
        },
        value: "fastest",
        valid: true,
        validation: {},
      },
    },
    formIsValid: false,
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    return isValid;
  }

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formELementIdentifier in this.state.orderFrom) {
      formData[formELementIdentifier] = this.state.orderFrom[
        formELementIdentifier
      ].value;
    }
    const order = {
      ingredient: this.props.ings,
      price: this.props.price,
      orderData: formData,
      useId: this.props.userId,
    };
    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangeHandler = (event, inputIdentifier) => {
    //console.log(event.target.value);

    const updatedOrderFormElement = updateObject(
      this.state.orderFrom[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.orderFrom[inputIdentifier].validation
        ),
        touched: true,
      }
    );
    const updatedOrderForm = updateObject(this.state.orderFrom, {
      [inputIdentifier]: updatedOrderFormElement,
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({
      orderFrom: updatedOrderForm,
      formIsValid: formIsValid,
    });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.orderFrom) {
      formElementArray.push({
        id: key,
        config: this.state.orderFrom[key],
      });
    }
    let Form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map((key, index) => {
          return (
            <Input
              key={key.id}
              elemetType={key.config.elemetType}
              elementConfig={key.config.elementConfig}
              value={key.config.value}
              invalid={!key.config.valid}
              shouldValidate={key.config.validation}
              touched={key.config.touched}
              change={(event) => this.inputChangeHandler(event, key.id)}
            />
          );
        })}

        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      Form = <Spinner />;
    }
    return (
      <div className={classes.ContaceData}>
        <h4> Enter your Contact Data</h4>
        {Form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredient,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToprops = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToprops
)(withErrorHandler(ContactData, axios));
