import { useParams } from "react-router-dom";
import { useUserData } from "../../context/UserContext";
import templates from "../../lib/templates";
import { useTemplateContext } from "../../context/TemplateContext";

const CardDisplay = () => {
  const { userData } = useUserData();
  const { templateId } = useParams();

  const { selectedTemplate, setBackView, backView } = useTemplateContext();

  // Fallback
  const template =
    selectedTemplate || templates.find((t) => t.id === templateId);

  if (!template) {
    return <div>Template not found</div>;
  }

  // const displayData = userData;

  const TemplateComponent = selectedTemplate?.component;

  return (
    <div className="card-display">
      <TemplateComponent {...userData} />

      <div className="card-actions">
        <button onClick={() => window.print()}>Print Card</button>
        <button
          onClick={() => setBackView(!backView)}
          className="back"
        >
          {backView ? "See front" : "See back"}
        </button>
      </div>
    </div>
  );
};

export default CardDisplay;
