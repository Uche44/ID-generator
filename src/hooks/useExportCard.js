import { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const useExportCard = () => {
  const cardRef = useRef(null);

  const captureCard = async () => {
    // Preload all images first
    const images = cardRef.current.querySelectorAll("img");
    await Promise.all(
      Array.from(images).map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; // Continue even if some images fail
        });
      })
    );

    return await html2canvas(cardRef.current, {
      scale: 3, // Higher quality
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: null,
      onclone: (clonedDoc) => {
        // Ensure all styles are preserved in the clone
        clonedDoc.querySelectorAll("*").forEach((el) => {
          el.style.boxSizing = "border-box";
          el.style.overflow = "visible";
        });
      },
    });
  };

  const downloadAsImage = async () => {
    try {
      const canvas = await captureCard();
      const link = document.createElement("a");
      link.download = "id-card.png";
      link.href = canvas.toDataURL("image/png", 1.0);
      link.click();
    } catch (error) {
      console.error("Image export failed:", error);
      alert("Failed to export as image. Please try again.");
    }
  };

  const downloadAsPDF = async () => {
    try {
      const canvas = await captureCard();
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [85.6, 54], // ID card size
      });

      // Calculate aspect ratio
      const imgProps = pdf.getImageProperties(canvas);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(canvas, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("id-card.pdf");
    } catch (error) {
      console.error("PDF export failed:", error);
      alert("Failed to export as PDF. Please try again.");
    }
  };

  const printCard = async () => {
    try {
      const canvas = await captureCard();
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Print ID Card</title>
            <style>
              @page { size: auto; margin: 0 auto; }
              body { margin: 0 auto;width:100% }
              img { 
                width: 50%; 
                height: 50%;
                margin:0 auto;
                object-fit: contain;
              }
            </style>
          </head>
          <body>
            <img src="${canvas.toDataURL("image/png")}" />
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    } catch (error) {
      console.error("Print failed:", error);
      alert("Failed to prepare print. Please try again.");
    }
  };

  return { cardRef, downloadAsImage, downloadAsPDF, printCard };
};
