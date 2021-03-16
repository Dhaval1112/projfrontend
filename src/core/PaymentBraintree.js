import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthanticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cardHelper";
import { createOrder } from "./helper/orderHelper";
import { getmeToken, processPayment } from "./helper/paymentBHelper";
import DropIn from "braintree-web-drop-in-react";

function PaymentBraintree({
  products,
  setReload = (f) => f,
  reload = undefined,
}) {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthanticated() && isAuthanticated().user._id;
  const token = isAuthanticated() && isAuthanticated().token;

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((info) => {
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showbtnDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            {console.log("HELLO ")}
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <div className="d-grid">
              <button className="btn d-block btn-success" onClick={onPurchase}>
                Buy
              </button>
            </div>
          </div>
        ) : (
          <h3>Please logine First or add something in your cart </h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      console.log(nonce);
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          setInfo({ ...info, success: response.success, loading: false });
          console.log("Payment success");
          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
            status: "Recieved",
          };
          createOrder(userId, token, orderData);
          cartEmpty(() => {
            console.log("Did we got a crash");
          });
          setReload(!reload);
        })
        .catch((error) => {
          console.log("Payment failed ");
          setInfo({ loading: false, success: false });
        });
    });
  };

  const getAmount = () => {
    let amount = 0;
    products.map((product) => {
      amount += product.price;
    });
    return amount;
  };
  return (
    <div>
      <h3 className="text-white">THIS IS BRAIN TREE ${getAmount()}</h3>
      {showbtnDropIn()}
    </div>
  );
}

export default PaymentBraintree;
