import { API } from "../../backend";

export const getmeToken = (userId, token) => {
  console.log("USER IN PAYMENT_HELPER", userId);
  return fetch(`${API}/payment/gettoken/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log("HH", error));
};

export const processPayment = (userId, token, paymentInfo) => {
  return fetch(`${API}payment/braintree/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paymentInfo),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
