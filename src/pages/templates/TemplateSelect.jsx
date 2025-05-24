import templates from "../../lib/templates";
import { TemplatePreview } from "../../components/TemplatePreview";
import { useNavigate } from "react-router-dom";
import { useTemplateContext } from "../../context/TemplateContext";
import { useUserData } from "../../context/UserContext";
import "./templateselect.css";

const TemplateSelect = () => {
  const navigate = useNavigate();
  const { userData } = useUserData(); 
  const { selectedTemplate, setSelectedTemplate } = useTemplateContext();

  const handleTemplateSelect = (template) => {
    if (!userData || !userData.name || !userData.photo) {
    
      alert("Please complete the form first before selecting a template");
      return;
    }

    setSelectedTemplate(template);
    navigate(`/card/${template.id}`);
  };

  
  const isFormComplete = userData && userData.name && userData.photo;

  return (
    <section className="container">
      <h2>Select a Template</h2>

      {!isFormComplete && (
        <div className="form-warning">
          Please complete the registration form before selecting a template
        </div>
      )}

      <div className="template-grid">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`template-card ${
              selectedTemplate?.id === template.id ? "selected" : ""
            } ${!isFormComplete ? "disabled" : ""}`}
            onClick={() => isFormComplete && handleTemplateSelect(template)}
          >
            <TemplatePreview template={template} />
            <div className="template-info">
              <h3>{template.name}</h3>
              {!isFormComplete && (
                <div className="disabled-overlay">Complete form to select</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TemplateSelect;
