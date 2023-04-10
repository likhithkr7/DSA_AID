import React, { useEffect, useState } from "react";
import { Row, Modal, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  addNewSubcategory,
  listCategoryDetails,
} from "../actions/categoryActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import List from "../components/List";

const SubCategoriesScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [show, setShow] = useState(false);
  const [subcategoryName, setSubcategoryName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const categoryDetails = useSelector((state) => state.categoryDetails);
  const { loading, error, category } = categoryDetails;

  const subCategoryAdd = useSelector((state) => state.subCategoryAdd);
  const { error_subcategory_add, success } = subCategoryAdd;

  useEffect(() => {
    dispatch(listCategoryDetails(userInfo._id, id, "fetch"));
    Alert_simple();
  }, [dispatch, userInfo._id, id, success]);

  const addSubcategoryHandler = (e) => {
    e.preventDefault();
    if (subcategoryName.length === 0) {
      handleClose();
      Alert("Topic Name cannot be empty");
    } else if (subcategoryName.length > 60) {
      handleClose();
      Alert_warn("Topic Name is too long");
    } else {
      dispatch(addNewSubcategory(userInfo._id, id, subcategoryName));
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

  const Alert_simple = () => {
    Swal.fire("Loading..");
  };

  return (
    <>
      {/* <Link className="back-btn btn btn-dark my-3" to={`/${userInfo._id}`}>
        &larr;
      </Link> */}
      {loading ? (
        <Loader />
      ) : error || error_subcategory_add ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          {category.subcategories?.map((subcategory) => (
            <Row key={subcategory._id}>
              <List category={category} subcategory={subcategory} />
            </Row>
          ))}
          <div className="screen-center">
            <button
              type="button"
              className="btn btn-dark btn-circle"
              onClick={handleShow}
              style={{ marginTop: "1rem" }}
            >
              <i className="fa fa-plus"></i>
            </button>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Topic</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Topic Name</Form.Label>
                  <Form.Control
                    type="Name"
                    placeholder="Enter topic name"
                    autoFocus
                    value={subcategoryName}
                    onChange={(e) => setSubcategoryName(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={addSubcategoryHandler}>
                ADD
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
};

export default SubCategoriesScreen;
