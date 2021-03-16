import React, { useEffect, useState } from "react";
import { API } from "../backend";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cardHelper";
import getProducts from "./helper/coreapicalls";
import PaymentBraintree from "./PaymentBraintree";
import StripeCheckout from "./StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2>This section is to load products</h2>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              RemoveFromCard={true}
              AddToCart={false}
              setReload={setReload}
              reload={reload}
            />
          );
        })}
      </div>
    );
  };

  const loadCheckouts = () => {
    return (
      <div>
        <h2>This section is for checkout</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-6">
          {products.length != 0 ? (
            loadAllProducts(products)
          ) : (
            <h1 className="text-danger">No products in cart</h1>
          )}
        </div>
        <div className="col-6">
          {/* This is for stripe   */}
          <StripeCheckout products={products} setReload={setReload} />
          <br />
          {/* this is fo braintree */}
          <PaymentBraintree products={products} setReload={setReload} v />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
