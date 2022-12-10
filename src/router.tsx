import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/Home";
import { AddVM } from "./pages/AddVM";
import { VMList } from "./pages/VMList";
import { VMWizard } from "./layouts/VMWizard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    element: <VMWizard />,
    children: [
      { path: "/add-vm", element: <AddVM /> },
      { path: "/vm-list", element: <VMList /> },
    ],
  },
]);
