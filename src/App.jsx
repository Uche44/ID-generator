import HomePage from "./pages/landingpage/HomePage";
import FormPage from "./pages/formpage/FormPage";
import TemplateSelect from "./pages/templates/TemplateSelect";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserDataProvider from "./context/UserContext";
import TemplateProvider from "./context/TemplateContext";
import CardDisplay from "./pages/carddisplay/CardDisplay";
import "./App.css";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      // errorElement: <ErrorPage />,
    },
    {
      path: "/formpage",
      element: <FormPage />,
    },
    {
      path: "/choose-template",
      element: <TemplateSelect />,
    },
    {
      path: "/card/:templateId",
      element: <CardDisplay />,
    },
  ]);

  return (
    <div>
      <UserDataProvider>
        <TemplateProvider>
          <RouterProvider router={router} />
        </TemplateProvider>
      </UserDataProvider>
    </div>
  );
};

export default App;
