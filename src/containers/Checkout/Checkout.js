import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
  clickedCancelHandler = () => {
    this.props.history.goBack();
  };

  clickedContinueHandler = () => {
    this.props.history.replace("/checkout/contant-data");
  };
  render() {
    // console.log("dafad" + this.state.totalPrice);
    // console.log(this.props);
    let summary = <Redirect to="/" />;

    if (this.props.ings) {
      const prchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {prchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            clickedCancel={this.clickedCancelHandler}
            clickedContinue={this.clickedContinueHandler}
          />
          <Route
            path={this.props.match.url + "/contant-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return <div>{summary}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredient,
    purchased: state.order.purchased,
  };
};

// const mapDispatchToProps = dispatch =>{
//   return{
//     onInitPurchase : ()=>dispatch(actions.purchaseInit()),
//   }
// }

export default connect(mapStateToProps)(Checkout);
