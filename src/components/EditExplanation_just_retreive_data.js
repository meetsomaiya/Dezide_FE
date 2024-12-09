import { useLocation } from "react-router-dom";

const EditExplanation = () => {
  const location = useLocation();
  const { actionName, modalName } = location.state || {}; // Retrieve data

  return (
    <div>
      <h2>Edit Explanation</h2>
      <p>Action Name: {actionName || "N/A"}</p>
      <p>Modal Name: {modalName || "N/A"}</p>
    </div>
  );
};

export default EditExplanation;
