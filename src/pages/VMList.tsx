import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { Navbar } from "~/layouts/VMWizard/Navbar";
import { Main } from "~/layouts/VMWizard/Main";
import { Footer } from "~/layouts/VMWizard/Footer";
import { AppDispatch } from "~/state/store";
import { TVMsRecord } from "~/state/slices/VMs/slice";
import { RootStateType } from "~/state/rootReducer";
import { deleteVMs, togglePower } from "~/state/slices/VMs/slice";

const columns: GridColDef[] = [
  { field: "VMName", headerName: "VM Name", width: 300, editable: true },
  {
    field: "procType",
    headerName: "Processor",
    width: 150,
    editable: true,
  },
  {
    field: "IP",
    headerName: "IP Address",
    width: 150,
    editable: true,
  },
  {
    field: "repository",
    headerName: "Repository",
    width: 200,
    editable: true,
  },
  {
    field: "power",
    headerName: "Power",
    editable: true,
    width: 200,
    renderCell: (params) => {
      return (
        <Typography
          sx={{ color: params.value ? "success.main" : "error.main" }}
        >
          {params.value ? "ON" : "OFF"}
        </Typography>
      );
    },
  },
];

export type TVMlistState = {
  selectedIds: string[];
};

export class Base extends React.Component<TWithStateProps, TVMlistState> {
  state = {
    selectedIds: [],
  };

  handleSelectChange = (ids: string[]) => this.setState({ selectedIds: ids });

  render() {
    const { navigate, VMsRecord, dispatch } = this.props;
    const { selectedIds } = this.state;
    return (
      <>
        <Navbar title="Nutanix mine with veem cluster setup" />
        <Main>
          <Box
            sx={{
              p: "40px",
              mx: "auto",
              maxWidth: "1360px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              height: 1,
            }}
          >
            <Typography sx={{ mb: "10px", fontWeight: 600 }}>
              Manage VMs
            </Typography>
            <Box sx={{ flexGrow: 1, width: 1 }}>
              <DataGrid
                rows={Object.values(VMsRecord)}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                onCellClick={(params) => {
                  if (params.field === "power") {
                    dispatch(togglePower(params.row.id));
                  }
                }}
                onSelectionModelChange={(selectionModel) => {
                  this.handleSelectChange(selectionModel as string[]);
                }}
              />
            </Box>
            <Button
              onClick={() => dispatch(deleteVMs(selectedIds))}
              sx={{ mt: 2 }}
              variant="contained"
            >
              Delete VMs
            </Button>
          </Box>
        </Main>
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
  VMsRecord: TVMsRecord;
};

const withState = <P extends TWithStateProps>(
  Component: React.ComponentType<P>
): React.FC<Omit<P, keyof TWithStateProps>> => {
  return (props) => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const VMsRecord = useSelector<RootStateType, TVMsRecord>(
      (state) => state.VMs.VMsRecord
    );
    return (
      <Component
        {...(props as P)}
        navigate={navigate}
        dispatch={dispatch}
        VMsRecord={VMsRecord}
      />
    );
  };
};

export const VMList = withState(Base);
