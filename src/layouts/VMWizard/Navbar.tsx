import * as React from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { Box, Typography, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

export type TNavbarProps = TWithStateProps & {
  title: string;
};

class Base extends React.Component<TNavbarProps> {
  render() {
    const { navigate, title } = this.props;
    return (
      <Box
        component="nav"
        sx={{
          display: "flex",
          alignItems: "center",
          p: "20px 40px",
          bgcolor: "grey.900",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: "1280px",
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ color: "common.white" }}>
            {title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: "1px",
                bgcolor: "common.white",
                height: "24px",
                mr: 1,
              }}
            />
            <IconButton
              sx={{ color: "common.white" }}
              onClick={() => navigate("/")}
            >
              <Close sx={{ color: "common.white" }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    );
  }
}

export type TWithStateProps = {
  navigate: NavigateFunction;
};

const withState = <P extends TWithStateProps>(
  Component: React.ComponentType<P>
): React.FC<Omit<P, keyof TWithStateProps>> => {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...(props as P)} navigate={navigate} />;
  };
};

export const Navbar = withState(Base);
