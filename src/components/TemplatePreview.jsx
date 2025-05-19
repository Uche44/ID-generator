// // components/TemplatePreview.jsx
// import { useRef, useEffect, useState } from "react";
// import html2canvas from "html2canvas";

// export const TemplatePreview = ({ template }) => {
//   const cardRef = useRef(null);
//   const [previewImage, setPreviewImage] = useState(null);

//   useEffect(() => {
//     const generatePreview = async () => {
//       if (cardRef.current) {
//         const canvas = await html2canvas(cardRef.current, {
//           scale: 1, // Smaller size for thumbnails
//           logging: false,
//           useCORS: true,
//         });
//         setPreviewImage(canvas.toDataURL("image/png"));
//       }
//     };

//     generatePreview();
//   }, [template]);

//   return (
//     <div className="template-preview">
//       {/* Hidden card that we'll capture */}
//       <div
//         ref={cardRef}
//         style={{ position: "absolute", left: "-9999px" }}
//       >
//         <template.component {...template.sampleData} />
//       </div>

//       {/* Show the generated preview */}
//       {previewImage ? (
//         <img
//           src={previewImage}
//           alt={`${template.name} preview`}
//           className="preview-image"
//         />
//       ) : (
//         <div className="loading-preview">Generating preview...</div>
//       )}
//     </div>
//   );
// };

import { useRef, useEffect, useState } from "react";
import html2canvas from "html2canvas";

export const TemplatePreview = ({ template }) => {
  const cardRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const generatePreview = async () => {
      if (cardRef.current) {
        try {
          const canvas = await html2canvas(cardRef.current, {
            scale: 1, 
            logging: false,
            useCORS: true,
            backgroundColor: null, 
          });
          setPreviewImage(canvas.toDataURL("image/png"));
        } catch (error) {
          console.error("Preview generation failed:", error);
        }
      }
    };

    generatePreview();
  }, [template]);

  return (
    <div className="template-preview">
      {/* Hidden rendering for capture */}
      <div
        ref={cardRef}
        style={{ position: "absolute", left: "-9999px" }}
      >
        <template.component {...template.sampleData} />
      </div>

      {/* Display the generated preview */}
      {previewImage ? (
        <img
          src={previewImage}
          alt={`${template.name} preview`}
          className="preview-image"
        />
      ) : (
        <div className="preview-loading">Loading preview...</div>
      )}
    </div>
  );
};
