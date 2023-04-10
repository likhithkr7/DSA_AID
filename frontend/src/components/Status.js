import React, { useState, useEffect } from "react";
import { listCategoryDetails, updateProblem } from "../actions/categoryActions";
import { useDispatch, useSelector } from "react-redux";

const Status = ({ category, subcategoryId, problem }) => {
  const dispatch = useDispatch();

  const [problemStatus, setProblemStatus] = useState(problem.status);

  const editProblem = useSelector((state) => state.editProblem);
  const { success } = editProblem;

  // const editProblemCount = useSelector((state) => state.editProblemCount);
  // const { success_edit_problem_count } = editProblemCount;

  useEffect(() => {
    dispatch(listCategoryDetails(category.user, category._id, "fetch"));
  }, [dispatch, success, category.user, category._id]);

  // useEffect(() => {
  //   dispatch(listCategoryDetails(category.user, category._id));
  // }, [dispatch, success_edit_problem_count, category.user, category._id]);

  const statusHandler = (e) => {
    if (problemStatus) {
      dispatch(
        updateProblem(
          category.user,
          category._id,
          subcategoryId,
          problem._id,
          problem.name,
          problem.difficulty,
          problem.link,
          false
        )
      );
    } else {
      dispatch(
        updateProblem(
          category.user,
          category._id,
          subcategoryId,
          problem._id,
          problem.name,
          problem.difficulty,
          problem.link,
          true
        )
      );
    }
    setProblemStatus(!problemStatus);
  };

  return (
    <>
      {problemStatus ? (
        <i
          className="fas fa-check-circle fa-lg"
          style={{ color: "#5DC250" }}
          onClick={(e) => statusHandler(e)}
        ></i>
      ) : (
        <i
          className="far fa-circle fa-lg"
          onClick={(e) => statusHandler(e)}
        ></i>
      )}
    </>
  );
};

export default Status;
