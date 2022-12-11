import * as React from "react";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { router } from "./router";
import { Styles } from "./styles/Styles";
import { store, persistor } from "./state/store";

export class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor as any} loading={null}>
          <Styles>
            <RouterProvider router={router} />
          </Styles>
        </PersistGate>
      </Provider>
    );
  }
}
