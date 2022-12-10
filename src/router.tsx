import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/Home";
import { CreateVM } from "./pages/CreateVM";
import { ViewVMs } from "./pages/ViewVMs";
import { VMWizard } from "./layouts/VMWizard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    element: <VMWizard />,
    children: [
      { path: "/create-vm", element: <CreateVM /> },
      { path: "/view-vms", element: <ViewVMs /> },
    ],
  },
]);
