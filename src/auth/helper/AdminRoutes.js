import { Route, Redirect } from "react-router-dom";
import React from "react";
import { isAuthanticated } from ".";

// now we can use AdminRoute instead of route
const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthanticated() && isAuthanticated().user.role === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
