import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthanticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cardHelper";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";

const StripeCheckout = ({ products, setReload = (f) => f }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthanticated() && isAuthanticated().token;
  const userId = isAuthanticated() && isAuthanticated().user._id;

  const getFinalAmoount = () => {
    console.log(`${API}stripepayment`);

    let amount = 0;
    products.map((product) => {
      amount += product.price;
    });
    return amount;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    // this token is that token whuch stored in local storage
    // console.log("Token ::", token);
    // console.log("Products ::", products);
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        // console.log(response);
        const { status } = response;
        console.log("STATUS ", status);
        if (status == 200) {
          cartEmpty(() => setData({ success: true }));
        }
      })
      .catch((error) => console.log("EEEEEEEE", error));
  };

  const showStripeButton = () => {
    return isAuthanticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_51IRYW7DjrsH9s6U7cAmJkLWSidljKm6aS5qMdPjq0uAr5FjiiwEqGfSWKkpYCyLzid4MRDq2viMMXYNhuUPqPVgo00EeX3drXh"
        token={makePayment}
        amount={getFinalAmoount() * 100}
        name="Buy Tshirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with Stripe</button>
      </StripeCheckoutButton>
    ) : (
      <link to="/sinin">
        <button className="btn btn-warning">Signin</button>
      </link>
    );
  };

  return (
    <div>
      <h3 className="text-white">
        {data.success && <Redirect to="/" />}
        Stripe checkout loaded ${getFinalAmoount()}
      </h3>
      {getFinalAmoount() > 0 && showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
