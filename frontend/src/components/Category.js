import React, { useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory } from "../actions/categoryActions";

const Category = ({ category }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { loading_category_delete } = categoryDelete;

  const deleteCategoryHandler = (e) => {
    dispatch(deleteCategory(category.user, category._id));
    window.location.reload();
    while (loading_category_delete) {
      window.location.reload();
    }
  };

  return (
    <>
      <Card
        className="my-3 rounded"
        style={{
          padding: "0rem",
        }}
      >
        <Link
          to={`/category/${category._id}`}
          style={{ textDecoration: "none" }}
        >
          <Card.Img src={category.image} variant="top" />
        </Link>
        <Card.Title
          className="text-center"
          style={{
            marginTop: "1rem",
            marginBottom: "1rem",
            fontSize: "0.9rem",
          }}
        >
          <div className="parent">
            <div className="child child1">{category.name}</div>
            <div className="child child2">
              <button
                type="button"
                className="btn btn-light btn-circle"
                onClick={handleShow}
              >
                <i
                  className="fas fa-trash-alt"
                  style={{ color: "#ff5349" }}
                ></i>
              </button>
            </div>
          </div>
        </Card.Title>
        {/* <ContextualExample
          percent={
            category.total === 0
              ? 0
              : Math.round((category.solved / category.total) * 100)
          }
        /> */}
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the entire {category.name} section ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteCategoryHandler}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Category;
