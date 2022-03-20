import "font-awesome/css/font-awesome.css"
import React, { useState, useEffect } from "react";
import EditItem from "./EditItem";

// export default class ShopProduct extends Component {
function ShopProduct(props) {
  const [openModal, setOpenModal] = useState(false);
  const [product, setProduct] = useState(props.product);
  
  
  // render() {
    return (
      <div className="card m-2">
        <div className="card-body">
        
          <h5 className="pt-2">{product.name} </h5>
          <img src={product.image} alt="Customer" width="150" height="150"/>
          <div>Product Id is {product.id}
            <span className="pull-right hand-icon"><i className="fa fa-times"></i></span>
          </div>
          <div>Product price is {product.price}</div>
        </div>
        <div className="card-footer">
          <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Edit Item
            </button>
            {openModal && <EditItem closeModal={setOpenModal} product ={product} updateProduct={setProduct} />}

        </div>
      </div>
    );
  // }
}
export default ShopProduct;