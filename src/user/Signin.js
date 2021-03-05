import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { signin, isAuthanticated, authenticate } from "../auth/helper/index";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;

  const { user } = isAuthanticated();

  const loadingMessage = () =>
    loading && (
      <div className=" text-center alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger text-center"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthanticated()) {
      return <Redirect to="/" />;
    }
  };

  const handleChange = (name) => (event) => {
    // [name] will automatically changed name as variable as
    // passed in parameter
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true });

    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("Login request failed"));
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          {loadingMessage()}
          {errorMessage()}
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                type="Email"
                onChange={handleChange("email")}
                value={email}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                type="Password"
                value={password}
                onChange={handleChange("password")}
                className="form-control"
              />
            </div>
            <br />
            <div className="row">
              <button
                onClick={onSubmit}
                className="btn btn-success btn-block col-10 offset-1"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Signin Page" description="Page for user to sign in!">
      {signInForm()}

      {performRedirect()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;
