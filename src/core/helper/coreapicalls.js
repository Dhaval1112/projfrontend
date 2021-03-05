import { API } from "../../backend";

import React from "react";

const getProducts = () => {
  return fetch(`${API}/products`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export default getProducts;
