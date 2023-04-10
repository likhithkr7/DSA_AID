import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addProblem, listCategoryDetails } from "../actions/categoryActions";
import validator from "validator";

const Plus = ({ category, subcategory }) => {
  const dispatch = useDispatch();

  const [problemName, setProblemName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [link, setLink] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const problemAdd = useSelector((state) => state.problemAdd);
  const { success_problem_add } = problemAdd;

  useEffect(() => {
    dispatch(listCategoryDetails(category.user, category._id, "fetch"));
  }, [dispatch, success_problem_add, category.user, category._id]);

  useEffect(() => {
    dispatch(listCategoryDetails(category.user, category._id, "fetch"));
  }, [dispatch, category.user, category._id]);

  const addProblemHandler = (e) => {
    if (problemName.length === 0) {
      handleClose();
      Alert("Problem Name cannot be empty");
    } else if (difficulty.length === 0) {
      handleClose();
      Alert("Difficulty cannot be empty");
    } else if (problemName.length > 100) {
      handleClose();
      Alert_warn("Problem Name is too long");
    } else if (difficulty.length > 10) {
      handleClose();
      Alert_warn("Difficulty is too long");
    } else if (link.length > 0 && !validator.isURL(link)) {
      Alert("Pleaser enter valid URL");
    } else {
      let disp = true;
      var words = problemName.split(" ");
      for (var i = 0; i < words.length; i += 1) {
        if (words[i].length > 25) {
          handleClose();
          Alert("Word in Problem Name cannot be greater than 25 characters");
          disp = false;
          break;
        }
      }
      if (disp) {
        dispatch(
          addProblem(
            category.user,
            category._id,
            subcategory._id,
            problemName,
            difficulty,
            link
          )
        );
        handleClose();
      }
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
    <div className="screen-center">
      <button
        type="button"
        className="btn btn-light btn-circle-small"
        onClick={handleShow}
      >
        <i className="fa fa-plus"></i>
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Problem</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Problem</Form.Label>
              <Form.Control
                type="Name"
                placeholder="Enter Problem Name"
                autoFocus
                value={problemName}
                onChange={(e) => setProblemName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Difficulty</Form.Label>
              <Form.Control
                type="Difficulty"
                placeholder="Enter Difficulty"
                autoFocus
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="Link"
                placeholder="Enter Problem Link"
                autoFocus
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addProblemHandler}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Plus;
