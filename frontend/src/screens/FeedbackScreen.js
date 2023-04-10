import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const FeedbackScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_3bmafbi",
        "template_7oywf1a",
        form.current,
        "d7i9ZcD6LP3deP-q3"
      )
      .then(
        (result) => {
          Swal.fire({
            icon: "success",
            text: "Feedback shared successfully !! Thanks for your valuable feedback.",
          });
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
      <form ref={form} onSubmit={sendEmail}>
        <label htmlFor="exampleTextarea" className="form-label mt-4">
          <h5>Name</h5>
        </label>
        <textarea
          name="from_name"
          className="form-control"
          id="name"
          style={{ height: "5vh" }}
          placeholder="Enter Name"
          value={userInfo.name}
        />
        <label htmlFor="exampleTextarea" className="form-label mt-4">
          <h5>Email</h5>
        </label>
        <textarea
          name="from_email"
          className="form-control"
          id="email"
          style={{ height: "5vh" }}
          placeholder="Enter Email"
          value={userInfo.email}
        />
        <label htmlFor="exampleTextarea" className="form-label mt-4">
          <h5>Share your feedback !!</h5>
        </label>
        <textarea
          name="message"
          className="form-control"
          id="exampleTextarea"
          style={{ height: "33vh" }}
          placeholder="Please feel free to write to us about anything you feel about this platform. Let us know how we could improve...&#10;(Developed by Likhith.R.K)"
        />
        <input
          className="btn btn-dark"
          style={{ marginTop: "20px" }}
          type="submit"
          value="Send"
        ></input>
      </form>
    </>
  );
};

export default FeedbackScreen;
