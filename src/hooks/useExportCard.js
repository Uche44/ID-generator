import { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const useExportCard = () => {
  const cardRef = useRef(null);

  const captureCard = async () => {
    // Create a hidden clone of the card to preserve original styles
    const originalCard = cardRef.current;
    const clone = originalCard.cloneNode(true);

    // Position clone off-screen without modifying styles
    clone.style.position = "fixed";
    clone.style.left = "-9999px";
    clone.style.top = "0";
    clone.style.zIndex = "9999";
    clone.style.visibility = "hidden";

    document.body.appendChild(clone);

    // Wait for images to load (including those in the clone)
    const images = clone.querySelectorAll("img");
    await Promise.all(
      Array.from(images).map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              img.onload = resolve;
              img.onerror = resolve;
            })
      )
    );

    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: null,
      allowTaint: true,
      ignoreElements: (el) => el === originalCard,
    });

    // Clean up
    document.body.removeChild(clone);
    return canvas;
  };

  const downloadAsImage = async () => {
    try {
      const canvas = await captureCard();
      const link = document.createElement("a");
      link.download = "id-card.png";
      link.href = canvas.toDataURL("image/png");
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
        // format: [85.6, 54],
      });

      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG");
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
            
          </head>
          <body>
            <img src="${canvas.toDataURL("image/png")}" />
          </body>
        </html>
      `);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
        setTimeout(() => printWindow.close(), 1000);
      }, 500);
    } catch (error) {
      console.error("Print failed:", error);
      alert("Failed to prepare print. Please try again.");
    }
  };

  return { cardRef, downloadAsImage, downloadAsPDF, printCard };
};
