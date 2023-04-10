import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateProblem, listCategoryDetails } from "../actions/categoryActions";
import validator from "validator";

const Edit = ({ categoryId, categoryUser, subcategoryId, problem }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [problemName, setProblemName] = useState(problem.name);
  const [difficulty, setDifficulty] = useState(problem.difficulty);
  const [link, setLink] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editProblem = useSelector((state) => state.editProblem);
  const { success } = editProblem;

  useEffect(() => {
    dispatch(listCategoryDetails(categoryUser, categoryId));
  }, [dispatch, success, categoryUser, categoryId]);

  const editHandler = (e) => {
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
          updateProblem(
            categoryUser,
            categoryId,
            subcategoryId,
            problem._id,
            problemName,
            difficulty,
            link,
            problem.status
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
    <>
      <button
        type="button"
        className="btn btn-dark btn-circle-small"
        onClick={handleShow}
        style={{ marginRight: "5px" }}
      >
        <i className="fas fa-edit"></i>
      </button>
      {/* <i className="fas fa-edit" onClick={handleShow}></i> */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Problem</Modal.Title>
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
          <Button variant="primary" onClick={editHandler}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Edit;
