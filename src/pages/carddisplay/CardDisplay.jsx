import { useParams } from "react-router-dom";
import { useUserData } from "../../context/UserContext";
import templates from "../../lib/templates";
import { useTemplateContext } from "../../context/TemplateContext";
import { useExportCard } from "../../hooks/useExportCard";
import { useEffect, useState } from "react";
import "./card.css";

const CardDisplay = () => {
  const { userData } = useUserData();
  const { templateId } = useParams();
  const { selectedTemplate, setBackView, backView } = useTemplateContext();
  const [photoUrl, setPhotoUrl] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const { cardRef, downloadAsImage, downloadAsPDF, printCard } =
    useExportCard();

  // photo data
  useEffect(() => {
    if (userData?.photo) {
      if (typeof userData.photo === "string") {
        setPhotoUrl(userData.photo);
      } else if (userData.photo instanceof Blob) {
        const url = URL.createObjectURL(userData.photo);
        setPhotoUrl(url);
        return () => URL.revokeObjectURL(url);
      }
    }
  }, [userData]);

  // export handling
  const handleExport = async (exportFn) => {
    setIsExporting(true);
    try {
      await exportFn();
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  // Find template
  const template =
    selectedTemplate || templates.find((t) => t.id === templateId);
  if (!template) return <div className="error">Template not found</div>;
  if (!userData) return <div className="error">User data not found</div>;

  const TemplateComponent = template.component;

  return (
    <div className="card-display">
      <div ref={cardRef}>
        <TemplateComponent
          {...userData}
          photo={photoUrl}
        />
      </div>

      <div className="card-actions">
        <button
          onClick={() => setBackView(!backView)}
          className="action-btn"
          disabled={isExporting}
        >
          {backView ? "See front" : "See back"}
        </button>
        <button
          onClick={() => handleExport(downloadAsImage)}
          className="action-btn"
          disabled={isExporting}
        >
          {isExporting ? "Exporting..." : "Download as Image"}
        </button>
        <button
          onClick={() => handleExport(downloadAsPDF)}
          className="action-btn"
          disabled={isExporting}
        >
          {isExporting ? "Exporting..." : "Download as PDF"}
        </button>
        <button
          onClick={() => handleExport(printCard)}
          className="action-btn"
          disabled={isExporting}
        >
          {isExporting ? "Preparing..." : "Print Card"}
        </button>
      </div>
    </div>
  );
};

export default CardDisplay;
