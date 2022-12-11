import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { Box, Button } from "@mui/material";

import { Footer } from "~/layouts/VMWizard/Footer";
import { AppDispatch } from "~/state/store";
import { TVMs } from "~/state/slices/VMs/slice";
import { RootStateType } from "~/state/rootReducer";

export class Base extends React.Component<TWithStateProps> {
  render() {
    const { navigate } = this.props;
    return (
      <>
        <Box
          component="main"
          sx={{
            p: "40px",
            flexGrow: 1,
            maxWidth: "1360px",
            alignSelf: "center",
            width: 1,
          }}
        >
          VMList
        </Box>
        <Footer>
          <Button onClick={() => navigate("/")} variant="contained">
            Close
          </Button>
        </Footer>
      </>
    );
  }
}

export type TWithStateProps = {
  navigate: NavigateFunction;
  dispatch: AppDispatch;
  VMs: TVMs;
};

const withState = <P extends TWithStateProps>(
  Component: React.ComponentType<P>
): React.FC<Omit<P, keyof TWithStateProps>> => {
  return (props) => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const VMs = useSelector<RootStateType>((state) => state.VMs);
    return (
      <Component
        {...(props as P)}
        navigate={navigate}
        dispatch={dispatch}
        VMs={VMs}
      />
    );
  };
};

export const VMList = withState(Base);
