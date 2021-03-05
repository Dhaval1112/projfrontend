import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cardHelper";
import ImageHelper from "./ImageHelper";

const Card = ({
  product,
  AddToCart = true,
  RemoveFromCard = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  // created state for redirecting user
  const [redirect, setRedirect] = useState(false);

  const [count, setCount] = useState(product.count);

  // this are some default values when product does not has any
  const CardTitle = product ? product.name : "A photo from pexels";

  const CardDescription = product
    ? product.description
    : "This is default description";

  const CardPrice = product ? product.price : "DEFAULT";

  // Add to cart function which will store data in localstorage
  const AAaddToCart = () => {
    // this parameter called after next or i shoould say next is this function
    addItemToCart(product, () => setRedirect(true));
  };

  // this will render and redirect user to cart page
  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addToCart) =>
    addToCart && (
      <button
        onClick={AAaddToCart}
        className="btn btn-block btn-outline-success mt-2 mb-2"
      >
        Add to Cart
      </button>
    );

  const showRemoveFromCart = (removeFromCard) =>
    removeFromCard && (
      <button
        onClick={() => {
          removeItemFromCart(product._id);
          setReload(!reload);
        }}
        className="btn btn-block btn-outline-danger mt-2 mb-2"
      >
        Remove from cart
      </button>
    );

  return (
    <div className="card text-white bg-dark border border-info my-2">
      {getARedirect(redirect)}
      <div className="card-header lead">{CardTitle}</div>
      <div className="card-body">
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {CardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {CardPrice}</p>
        <div className="row">
          <div className="col-12 d-grid">{showAddToCart(AddToCart)}</div>
          <div className="col-12 d-grid">
            {showRemoveFromCart(RemoveFromCard)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
