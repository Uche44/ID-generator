import templates from "../../lib/templates";
import { TemplatePreview } from "../../components/TemplatePreview";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTemplateContext } from "../../context/TemplateContext";

const TemplateSelect = () => {
  const navigate = useNavigate();

  const { selectedTemplate, setSelectedTemplate } = useTemplateContext();

  // const [hoveredTemplate, setHoveredTemplate] = useState(null);
  // const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    navigate(`/card/${template.id}`);
  };

  

  return (
    <section className="container">
      <h2>Select a Template</h2>
      <div className="template-grid">
        {templates.map((template) => (
          <div
            key={template.id}
            // className="template-card"
            className={`template-card ${
              selectedTemplate?.id === template.id ? "selected" : ""
            }`}
            onClick={() => handleTemplateSelect(template)}
            // onClick={() => onSelect(template)}
            // onMouseEnter={() => setHoveredTemplate(template)}
            // onMouseLeave={() => setHoveredTemplate(null)}
          >
            <TemplatePreview template={template} />
            <div className="template-info">
              <h3>{template.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Large preview on hover */}
      {/* {hoveredTemplate && (
        <div className="hover-preview">
          <h3>{hoveredTemplate.name}</h3>
          <div className="full-preview">
            <hoveredTemplate.component {...hoveredTemplate.sampleData} />
          </div>
        </div>
      )} */}
    </section>
  );
};
export default TemplateSelect;
