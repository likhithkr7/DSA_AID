import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import Status from "./Status";
import Edit from "./Edit";
import Delete from "./Delete";
import Plus from "./Plus";
import { deleteSubcategory } from "../actions/categoryActions";

const List = ({ category, subcategory }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [listDisplayStatus, setListDisplayStatus] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const numRows = subcategory.problems.length;

  const subcategoryDelete = useSelector((state) => state.subcategoryDelete);
  const { loading_subcategory_delete } = subcategoryDelete;

  const deleteSubcategoryHandler = (e) => {
    dispatch(deleteSubcategory(category.user, category._id, subcategory._id));
    window.location.reload();
    while (loading_subcategory_delete) {
      window.location.reload();
    }
  };

  return (
    <div className="d-grid gap-2">
      <div className="parent-button">
        <Button
          className="my-3 table-responsive subcategory_name child-button child-button-1"
          variant="dark"
          size="lg"
          onClick={() => setListDisplayStatus((s) => !s)}
        >
          {subcategory.name}
        </Button>
        <Button
          className="my-3 table-responsive subcategory_name child-button child-button-2"
          variant="dark"
          size="lg"
          onClick={handleShow}
        >
          <i className="fas fa-trash-alt" style={{ color: "#ff5349" }}></i>
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the entire {subcategory.name} topic ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteSubcategoryHandler}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {listDisplayStatus ? (
        <>
          <table className="table table-hover">
            <thead>
              {/* <tr>
                <th scope="col">Status</th>
                <th scope="col">Problem</th>
                <th scope="col">Difficulty</th>
                <th scope="col">Notes</th>
              </tr> */}
            </thead>
            <tbody>
              {subcategory.problems?.map((problem, index) => (
                <tr
                  key={problem._id}
                  className={
                    numRows % 2 === 0
                      ? index % 2 === 0
                        ? "table-secondary"
                        : "table-primary"
                      : index % 2 === 0
                      ? "table-primary"
                      : "table-secondary"
                  }
                >
                  <td>
                    <Status
                      category={category}
                      subcategoryId={subcategory._id}
                      problem={problem}
                    />
                  </td>
                  <td
                    style={{
                      width: "40%",
                      maxWidth: "40%",
                    }}
                  >
                    <div>{problem.name}</div>
                  </td>
                  <td>{problem.difficulty}</td>
                  <td>
                    <a href={problem.link}>
                      <button type="button" className="btn btn-circle-small">
                        <i
                          className="fas fa-link"
                          style={{ color: "black" }}
                        ></i>
                      </button>
                    </a>
                  </td>
                  <td>
                    <Link
                      to={`/notes/${category._id}/${subcategory._id}/${problem._id}`}
                      state={{ problem: problem, user: category.user }}
                      style={{ textDecoration: "none" }}
                    >
                      <button
                        type="button"
                        className="btn btn-dark btn-circle-small"
                      >
                        <i className="far fa-file-alt"></i>
                      </button>
                    </Link>
                  </td>
                  <td>
                    <Edit
                      categoryId={category._id}
                      categoryUser={category.user}
                      subcategoryId={subcategory._id}
                      problem={problem}
                    />{" "}
                    <Delete
                      category={category}
                      subcategoryId={subcategory._id}
                      problem={problem}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Plus category={category} subcategory={subcategory} />
        </>
      ) : null}
    </div>
  );
};

export default List;
