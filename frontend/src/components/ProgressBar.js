import ProgressBar from "react-bootstrap/ProgressBar";

function ContextualExample({ percent }) {
  return <ProgressBar animated variant="success" now={percent} />;
}

export default ContextualExample;
