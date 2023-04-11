import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: "100px",
        height: "100px",
        left: "50%",
        position: "absolute",
        textAlign: "center",
        top: "50%",
      }}
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default Loader;

// width: "100px",
// height: "100px",
// margin: "auto",
// display: "block",
