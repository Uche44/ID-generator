// import templates from "../../lib/templates";
// import { TemplatePreview } from "../../components/TemplatePreview";
// // import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import { useTemplateContext } from "../../context/TemplateContext";
// import { useUserData } from "../../context/UserContext";

// const TemplateSelect = () => {
//   const navigate = useNavigate();
//   const { userData } = useUserData();
//   const { selectedTemplate, setSelectedTemplate } = useTemplateContext();

//   // const [hoveredTemplate, setHoveredTemplate] = useState(null);
//   // const [selectedTemplate, setSelectedTemplate] = useState(null);

//   const handleTemplateSelect = (template) => {
//     if (!userData) {
//       setSelectedTemplate(template);
//       navigate(`/card/${template.id}`);
//     } else {
//       console.log("fill the form first");
//     }
//   };

//   return (
//     <section className="container">
//       <h2>Select a Template</h2>
//       <div className="template-grid">
//         {templates.map((template) => (
//           <div
//             key={template.id}
//             // className="template-card"
//             className={`template-card ${
//               selectedTemplate?.id === template.id ? "selected" : ""
//             }`}
//             onClick={() => handleTemplateSelect(template)}
//             // onClick={() => onSelect(template)}
//             // onMouseEnter={() => setHoveredTemplate(template)}
//             // onMouseLeave={() => setHoveredTemplate(null)}
//           >
//             <TemplatePreview template={template} />
//             <div className="template-info">
//               <h3>{template.name}</h3>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Large preview on hover */}
//       {/* {hoveredTemplate && (
//         <div className="hover-preview">
//           <h3>{hoveredTemplate.name}</h3>
//           <div className="full-preview">
//             <hoveredTemplate.component {...hoveredTemplate.sampleData} />
//           </div>
//         </div>
//       )} */}
//     </section>
//   );
// };
// export default TemplateSelect;

import templates from "../../lib/templates";
import { TemplatePreview } from "../../components/TemplatePreview";
import { useNavigate } from "react-router-dom";
import { useTemplateContext } from "../../context/TemplateContext";
import { useUserData } from "../../context/UserContext";

const TemplateSelect = () => {
  const navigate = useNavigate();
  const { userData } = useUserData(); // Changed from UserData to userData (convention)
  const { selectedTemplate, setSelectedTemplate } = useTemplateContext();

  const handleTemplateSelect = (template) => {
    if (!userData || !userData.name || !userData.photo) {
      // Check for required fields
      alert("Please complete the form first before selecting a template");
      return;
    }

    setSelectedTemplate(template);
    navigate(`/card/${template.id}`);
  };

  // Disable template cards if form isn't complete
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
