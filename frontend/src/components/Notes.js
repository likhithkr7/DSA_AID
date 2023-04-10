import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateNotes, listCategoryDetails } from "../actions/categoryActions";
import Loader from "./Loader";
import Message from "./Message";
import Swal from "sweetalert2";

const Notes = ({ user, id, subcategoryId, problem, note }) => {
  const dispatch = useDispatch();

  const [description, setDescription] = useState(note.description);
  const [approach, setApproach] = useState(note.approach);
  const [timeComplexity, setTimeComplexity] = useState(note.timecomplexity);
  const [spaceComplexity, setSpaceComplexity] = useState(note.spacecomplexity);

  const editNote = useSelector((state) => state.editNote);
  const { error_edit_note, loading_edit_note, success } = editNote;

  useEffect(() => {
    dispatch(listCategoryDetails(user, id));
  }, [dispatch, success, user, id]);

  const updateNotesHandler = (e) => {
    if (description.length > 1000) {
      Alert("Problem description is too long");
    } else if (approach.length > 1000) {
      Alert("Approach is too long");
    } else if (timeComplexity.length > 500) {
      Alert("Time Complexity is too long");
    } else if (spaceComplexity.length > 500) {
      Alert("Space Complexity is too long");
    } else {
      dispatch(
        updateNotes(
          user,
          id,
          subcategoryId,
          problem._id,
          note._id,
          description,
          approach,
          timeComplexity,
          spaceComplexity
        )
      );
      Swal.fire({
        icon: "success",
        text: "Notes saved successfully",
      });
    }
  };

  const Alert = (msg) => {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: msg,
    });
  };

  return (
    <>
      {loading_edit_note ? (
        <Loader />
      ) : error_edit_note ? (
        <Message variant="danger">{error_edit_note}</Message>
      ) : (
        <>
          <div style={{ marginTop: "15px" }}>
            <h5>Problem : {problem.name}</h5>
          </div>
          <div className="form-group">
            <label htmlFor="exampleTextarea" className="form-label mt-4">
              <h5>Description</h5>
            </label>
            <textarea
              className="form-control"
              id="exampleTextarea"
              style={{ height: "10vh" }}
              placeholder="Enter Problem Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleTextarea" className="form-label mt-4">
              <h5>Approach</h5>
            </label>
            <textarea
              className="form-control"
              id="exampleTextarea"
              style={{ height: "25vh" }}
              placeholder="Enter Approach"
              value={approach}
              onChange={(e) => setApproach(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleTimeComplexity" className="form-label mt-4">
              <h5>Time Complexity</h5>
            </label>
            <textarea
              type="timeComplexity"
              className="form-control"
              id="exampleTimeComplexity"
              aria-describedby="timeComplexityhHelp"
              placeholder="Enter Time Complexity"
              style={{ height: "8vh" }}
              onChange={(e) => setTimeComplexity(e.target.value)}
              value={timeComplexity}
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="exampleInputSpaceComplexity"
              className="form-label mt-4"
            >
              <h5>Space Complexity</h5>
            </label>
            <textarea
              type="spaceComplexity"
              className="form-control"
              id="exampleInputSpaceComplexity"
              placeholder="Enter Space Complexity"
              style={{ height: "8vh" }}
              onChange={(e) => setSpaceComplexity(e.target.value)}
              value={spaceComplexity}
            />
          </div>
          <button
            type="button"
            className="btn btn-dark"
            style={{ marginTop: "20px" }}
            onClick={updateNotesHandler}
          >
            Save
          </button>
        </>
      )}
    </>
  );
};

export default Notes;
