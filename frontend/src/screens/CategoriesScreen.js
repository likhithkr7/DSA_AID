import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import Category from "../components/Category";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewCategory, listCategories } from "../actions/categoryActions";

const CategoriesScreen = () => {
  const IMAGES = [
    "/images/1.png",
    "/images/2.png",
    "/images/4.png",
    "/images/5.png",
    "/images/6.jpg",
    "/images/7.jpg",
    "/images/8.jpg",
  ];

  const [show, setShow] = useState(false);
  const [sectionName, setSectionName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const redirect = "/";

  useEffect(() => {
    if (!userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  const categoryAdd = useSelector((state) => state.categoryAdd);
  const { error_category_add, success } = categoryAdd;

  useEffect(() => {
    dispatch(listCategories(userInfo._id));
  }, [dispatch, userInfo._id, success]);

  const addHandler = (e) => {
    e.preventDefault();
    if (sectionName.length === 0) {
      handleClose();
      Alert("Section Name cannot be empty");
    } else if (sectionName.length > 34) {
      handleClose();
      Alert_warn("Section Name is too long");
    } else {
      let indx = categories.length % 7;
      dispatch(
        addNewCategory(userInfo._id, sectionName, [], 0, 0, IMAGES[indx])
      );
      handleClose();
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

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error || error_category_add ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {categories.map((category) => (
              <Col key={category._id} sm={12} md={6} lg={4} xl={3}>
                <Category category={category} />
              </Col>
            ))}
          </Row>
          <div className="screen-center">
            <button
              type="button"
              className="btn btn-dark btn-circle"
              onClick={handleShow}
            >
              <i className="fa fa-plus"></i>
            </button>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Section</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Section Name</Form.Label>
                  <Form.Control
                    type="Name"
                    placeholder="Enter section name"
                    autoFocus
                    value={sectionName}
                    onChange={(e) => setSectionName(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={addHandler}>
                ADD
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default CategoriesScreen;
