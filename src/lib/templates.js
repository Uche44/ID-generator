import {
  MinimalTemplate,
  CorporateTemplate,
  TemplateThree,
} from "../components/templates/TemplateComponents";
import { sampleData } from "./sampleData";
const templates = [
  {
    id: 1,
    name: "Minimal",
    component: MinimalTemplate,
    sampleData,
  },
  {
    id: 2,
    name: "Corporate",
    component: CorporateTemplate,
    previewImage: "/corporate-preview.jpg",
    sampleData,
  },
  {
    id: 3,
    name: "Three",
    component: TemplateThree,
    previewImage: "/three-preview.jpg",
    sampleData,
  },
];
export default templates;
