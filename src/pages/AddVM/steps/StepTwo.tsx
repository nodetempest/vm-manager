import * as React from "react";
import { Checkbox, Typography, FormControlLabel } from "@mui/material";
import { TreeView, TreeItem } from "@mui/lab";
import { ExpandMore, ChevronRight } from "@mui/icons-material";
import { useForm, Control, Controller, ControllerProps } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import untypedClusters from "./clusters.json";

type TCluster = {
  label: string;
  value: string;
  children?: TCluster[];
};

const clusters: TCluster[] = untypedClusters;

export interface IStepTwoFormInput {
  cluster: string;
}

const schema = yup.object({
  cluster: yup.string().required("Cluster is required"),
});

const defaultValues = {
  cluster: "",
};

export const useStepTwoForm = () => {
  return useForm<IStepTwoFormInput>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onSubmit",
  });
};

export type TStepTwoProps = {
  control: Control<IStepTwoFormInput>;
};

export class StepTwo extends React.Component<TStepTwoProps> {
  renderCluster = (
    cluster: TCluster[],
    params: Parameters<
      ControllerProps<IStepTwoFormInput, "cluster">["render"]
    >[0]
  ) => {
    return cluster.map((cluster) => (
      <TreeItem
        nodeId={cluster.value}
        key={cluster.value}
        label={
          cluster?.children ? (
            cluster.label
          ) : (
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ p: "2px" }}
                  size="small"
                  onChange={() => {
                    params.field.onChange({
                      target: {
                        value:
                          // toggle
                          params.field.value === cluster.value
                            ? ""
                            : cluster.value,
                      },
                    });
                  }}
                  checked={params.field.value === cluster.value}
                />
              }
              label={cluster.label}
            />
          )
        }
        sx={{
          "& .MuiTreeItem-content.Mui-focused": {
            bgcolor: "transparent",
          },
          "& .MuiTreeItem-content:hover": {
            bgcolor: "transparent",
          },
        }}
      >
        {cluster?.children && this.renderCluster(cluster.children, params)}
      </TreeItem>
    ));
  };

  render() {
    const { control } = this.props;
    return (
      <>
        <Typography sx={{ mb: 2 }}>
          Please select destination property
        </Typography>
        <Controller
          render={(params) => {
            type t = typeof params;
            return (
              <>
                <TreeView
                  defaultCollapseIcon={<ExpandMore />}
                  defaultExpandIcon={<ChevronRight />}
                  sx={{
                    height: 380,
                    flexGrow: 1,
                    overflowY: "auto",
                    border: "1px solid",
                    borderColor: "grey.400",
                    p: 1,
                    mb: 1,
                  }}
                  disableSelection
                  defaultExpanded={clusters.map((cluster) => cluster.value)}
                >
                  {this.renderCluster(clusters, params)}
                </TreeView>
                {params.fieldState.error?.message && (
                  <Typography variant="subtitle2" sx={{ color: "error.main" }}>
                    {params.fieldState.error?.message}
                  </Typography>
                )}
              </>
            );
          }}
          control={control}
          name="cluster"
        />
      </>
    );
  }
}
