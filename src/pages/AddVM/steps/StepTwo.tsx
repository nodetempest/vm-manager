import * as React from "react";
import { Checkbox } from "@mui/material";
import { TreeView, TreeItem } from "@mui/lab";
import { ExpandMore, ChevronRight } from "@mui/icons-material";

import untypedClusters from "./clusters.json";

type TCluster = {
  label: string;
  value: string;
  children?: TCluster[];
};

const clusters: TCluster[] = untypedClusters;

export type TStepTwoState = {
  checkedId: string;
};
export class StepTwo extends React.Component<{}, TStepTwoState> {
  state = {
    checkedId: "",
  };

  renderCluster = (cluster: TCluster[]) => {
    return cluster.map((cluster) => (
      <TreeItem
        nodeId={cluster.value}
        key={cluster.value}
        label={
          cluster?.children ? (
            cluster.label
          ) : (
            <>
              <Checkbox
                sx={{ p: "2px" }}
                size="small"
                onChange={() =>
                  this.setState((prev) => ({
                    checkedId:
                      prev.checkedId === cluster.value ? "" : cluster.value,
                  }))
                }
                checked={this.state.checkedId === cluster.value}
              />{" "}
              {cluster.label}
            </>
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
        {cluster?.children && this.renderCluster(cluster.children)}
      </TreeItem>
    ));
  };

  render() {
    return (
      <TreeView
        defaultCollapseIcon={<ExpandMore />}
        defaultExpandIcon={<ChevronRight />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
        disableSelection
        defaultExpanded={clusters.map((cluster) => cluster.value)}
      >
        {this.renderCluster(clusters)}
      </TreeView>
    );
  }
}
