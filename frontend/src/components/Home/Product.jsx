import React, { Component, useState } from "react";
import "font-awesome/css/font-awesome.css";
import { useNavigate } from "react-router-dom";

function Product(props) {
  const [product, setProduct] = useState(props.product);
  const navigate = useNavigate();
  const handleBuyNow = (e)=>{
    navigate( "/productPage/" + product.id);
  }
  const handleAddToFav = (e)=>{
    //todo add handling for fav
  }
  return (
    <div className="card m-2">
      <div className="card-body">
        <h5 className="pt-2">{product.name} </h5>
        <img src="https://picsum.photos/id/1010/200" alt="Customer" />
        <div>
          Product Id is {product.id}
          <span className="pull-right hand-icon">
            <i className="fa fa-times"></i>
          </span>
        </div>
        <div>Product price is {product.price}</div>
      </div>
      <div className="card-footer">
        <button className="btn btn-primary" onClick={handleBuyNow} >Buy Now</button><br /><br />
        <button className="btn btn-primary" onClick={handleAddToFav}>Add to Fav</button>
      </div>
    </div>
  );
}

export default Product;
