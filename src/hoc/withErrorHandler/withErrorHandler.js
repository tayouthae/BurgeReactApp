import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Auxiliary from "../Auxiliary";

const withErrorHandler = (WrapComponet, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    
    componentWillMount() {
      this.reqInterceptors = axios.interceptors.request.use((request) => {
        this.setState({ error: null });
        return request;
      });

      this.resInterceptors = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          console.log(error.message);
          this.setState({ error: error });
        }
      );
    }

    // componentWillUnmount() {
    //   axios.interceptors.responce.eject(this.resInterceptors);
    //   axios.interceptors.request.eject(this.reqInterceptors);
    // }

    errorConformedHadler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Auxiliary>
          <Modal    
            show={this.state.error}
            cancelPurchase={this.errorConformedHadler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrapComponet {...this.props} />
        </Auxiliary>
      );
    }
  };
};

export default withErrorHandler;
