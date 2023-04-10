import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";
import validator from "validator";
import categories from "../data/categories_data";
import { addNewCategory } from "../actions/categoryActions";
import Swal from "sweetalert2";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
      categories.forEach((element) => {
        dispatch(
          addNewCategory(
            userInfo._id,
            element.name,
            element.subcategories,
            element.image
          )
        );
        // Swal.fire({
        //   icon: "success",
        //   text: "Welcome to DSA AID !! Please wait while we are loading things for you..",
        // });
      });
      Alert_reload();
    }
  }, [navigate, userInfo, redirect, dispatch]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Alert("Passwords do not match");
    } else if (name.length === 0) {
      Alert("Name cannot be empty");
    } else if (name.length > 25) {
      Alert_warn(
        "Name is too long. Please enter your firstname, lastname or nickname"
      );
    } else if (!validator.isEmail(email)) {
      Alert("Please enter valid Email Id");
    } else if (password.length === 0) {
      Alert("Password cannot be empty");
    } else if (password.length < 8) {
      Alert("Password should contain minimum 8 characters");
    } else {
      dispatch(register(name, email, password));
    }
  };

  const Alert = (msg) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: msg,
    });
  };

  const Alert_warn = (msg) => {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: msg,
    });
  };

  const Alert_reload = () => {
    Swal.fire({
      icon: "success",
      title: "Welcome to DSA AID !!",
      text: "Please wait while we are loading things for you..",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
        window.location.reload();
        window.location.reload();
        window.location.reload();
        window.location.reload();
      }
    });
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {error && <Message variant={"danger"}>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email" className="form">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="form">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword" className="form">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" style={{ marginTop: 15 }}>
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an Account? <Link to={"/"}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
