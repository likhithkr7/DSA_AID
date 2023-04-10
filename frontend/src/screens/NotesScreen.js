import React from "react";
import { Link } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import Notes from "../components/Notes";

const NotesScreen = () => {
  const location = useLocation();

  const { id, subcategoryId } = useParams();

  let problem = location.state.problem;
  let user = location.state.user;

  return (
    <>
      <Link className="back-btn btn btn-dark my-3" to={`/category/${id}`}>
        &larr;
      </Link>
      {problem.notes.map((note) => (
        <Notes
          key={note._id}
          user={user}
          id={id}
          subcategoryId={subcategoryId}
          problem={problem}
          note={note}
        />
      ))}
    </>
  );
};

export default NotesScreen;
