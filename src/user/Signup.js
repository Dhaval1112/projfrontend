import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper/index";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const successMessage = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}
      >
        New account was created <Link to="/signin"> Login Here</Link>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  // 2 Currying :- its a function returning value another function with some value which
  // we passed or not than it would done by it
  const handleChange = (name) => (event) => {
    // [name] will automatically changed name as variable as
    // passed in parameter
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  // Simpler version of above handler methd
  const handleChangeName = (event, name) => {
    // [name] will automatically changed name as variable as
    // passed in parameter

    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch();
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={(ev) => {
                  handleChangeName(ev, "name");
                }}
                value={name}
                type="text"
              />
            </div>

            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                type="Email"
                // onChange={handleChange("email")}
                value={email}
                onChange={(ev) => {
                  handleChangeName(ev, "email");
                }}
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
    <Base title="Signup Page" description="Page for user to sign up!">
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          {successMessage()}
          {errorMessage()}
        </div>
      </div>
      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
