import { RouterProvider } from "react-router/dom";
import { routesApp } from "./router/routes";

function App() {
  return <RouterProvider router={routesApp} />;
}

export default App;
