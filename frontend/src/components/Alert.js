import React from "react";

const Alert = ({ message }) => {
  return (
    <div class="alert alert-dismissible alert-danger">
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      <strong>Oh Snap !!</strong> {message}
    </div>
  );
};

export default Alert;
