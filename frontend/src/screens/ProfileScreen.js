import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import { updateUserProfile } from "../actions/userActions";
import { getUserDetails } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import validator from "validator";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user, success]);

  const submitHandler = (e) => {
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
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
      AlertSuccess("Profile updated successfully");
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

  const AlertSuccess = (msg) => {
    Swal.fire({
      icon: "success",
      text: msg,
    });
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {error && <Message variant={"danger"}>{error}</Message>}
        {success && <Message variant={"success"}>Profile Updated</Message>}
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
            Update
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
