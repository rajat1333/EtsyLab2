import React, { Component, useState } from "react";
import "font-awesome/css/font-awesome.css";
import { useNavigate } from "react-router-dom";

function Product(props) {
  const [product, setProduct] = useState(props.product);
  const navigate = useNavigate();
  const handleBuyNow = (e)=>{
    navigate( "/productPage/" + product._id);
  }
  const handleAddToFav = (e)=>{
    alert("Item added to Favourites")
    //todo add handling for fav
  }
  return (
    <div className="card m-2">
      <div className="card-body">
        
        {/* <img src="https://picsum.photos/id/1010/200" alt="Customer" /> */}
        <img src={product.image} alt="Customer" width="200" height="200"/>
        <div>
          {/* Product Id is {product.id} */}
          <span className="pull-right hand-icon">
            <i className="fa fa-times"></i>
          </span>
        </div>
        <h5 className="pt-2">{product.name} </h5>
        <div>Price : $ {product.price} </div>
        {/* <div>Available Quantity : {product.quantity}</div> */}
      </div>
      <div className="card-footer">
        {product.quantity<1 && <div><div>Item Out of stock</div><button className="btn btn-primary" onClick={handleBuyNow} >View Item</button><br /><br /></div>}
        {product.quantity>0 && <div><button className="btn btn-primary" onClick={handleBuyNow} >Buy Now</button><br /><br /></div>}
        
        <button className="btn btn-primary" onClick={handleAddToFav}>Add to Fav</button>
      </div>
    </div>
  );
}

export default Product;
