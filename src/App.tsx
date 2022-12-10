import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Styles } from "./styles/Styles";

export const App = () => {
  return (
    <Styles>
      <RouterProvider router={router} />
    </Styles>
  );
};
