import React, { Component } from "react";
import "font-awesome/css/font-awesome.css"

export default class ShopProduct extends Component {
  state = {
    product: this.props.product,
  };
  render() {
    return (
      <div className="card m-2">
        <div className="card-body">
        
          <h5 className="pt-2">{this.state.product.name} </h5>
          <img src="https://picsum.photos/id/1010/200" alt="Customer" />
          <div>Product Id is {this.state.product.id}
            <span className="pull-right hand-icon"><i className="fa fa-times"></i></span>
          </div>
          <div>Product price is {this.state.product.price}</div>
        </div>
        <div className="card-footer">
          {/* <div className="float-left">
            <button className="btn-group">
              <button className="btn btn-outline-success">-</button>
            </button>
          </div> */}
          <button className="btn btn-primary">Edit Item</button>
        </div>
      </div>
    );
  }
}
