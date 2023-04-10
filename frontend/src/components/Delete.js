import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { deleteProblem, listCategoryDetails } from "../actions/categoryActions";

const Delete = ({ category, subcategoryId, problem }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const problemDelete = useSelector((state) => state.problemDelete);
  const { success_problem_delete } = problemDelete;

  useEffect(() => {
    dispatch(listCategoryDetails(category.user, category._id, "fetch"));
  }, [dispatch, success_problem_delete, category.user, category._id]);

  useEffect(() => {
    dispatch(listCategoryDetails(category.user, category._id, "fetch"));
  }, [dispatch, category.user, category._id]);

  const deleteProblemHandler = (e) => {
    dispatch(
      deleteProblem(category.user, category._id, subcategoryId, problem._id)
    );
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-dark btn-circle-small"
        onClick={handleShow}
      >
        <i className="fas fa-trash-alt" style={{ color: "#ff5349" }}></i>
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the problem - {problem.name} ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteProblemHandler}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <i
        className="fas fa-trash-alt"
        style={{ color: "#ff5349" }}
        onClick={deleteHandler}
      ></i> */}
    </>
  );
};

export default Delete;
