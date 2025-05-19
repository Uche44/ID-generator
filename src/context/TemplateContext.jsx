import { createContext, useContext, useState } from "react";

const TemplateContext = createContext();

const TemplateProvider = ({ children }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [backView, setBackView] = useState(false);
  return (
    <TemplateContext.Provider
      value={{ selectedTemplate, setSelectedTemplate, backView, setBackView }}
    >
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplateContext = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error(
      "useTemplateContext must be used within a TemplateProvider"
    );
  }
  return context;
};

export default TemplateProvider;
