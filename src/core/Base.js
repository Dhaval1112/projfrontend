import React from "react";
import Menu from "./Menu";

export default function Base({
  title = "My Title",
  description = "Default description",
  className = "text-white p-4",
  children,
}) {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div className="jumbotron  text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer  mt-auto py-3">
        <div className="container-fluid bg-success text-white text-center py-3">
          <h1>If you got any question, feel free to reach out!</h1>
          <button className="btn btn-warning btn-lg">Contect us</button>
        </div>
        <div className="container">
          <span className="text-muted">
            An amazing <span className="text-white">MERN</span> Bootcamp
          </span>
        </div>
      </footer>
    </div>
  );
}
