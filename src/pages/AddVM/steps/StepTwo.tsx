import * as React from "react";
import { TreeView, TreeItem } from "@mui/lab";
import { ExpandMore, ChevronRight } from "@mui/icons-material";

import untypedClusters from "./clusters.json";

type TCluster = {
  label: string;
  value: string;
  children?: TCluster[];
};

const clusters: TCluster[] = untypedClusters;

export class StepTwo extends React.Component {
  render() {
    return (
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMore />}
        defaultExpandIcon={<ChevronRight />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        {(function renderCluster(cluster) {
          return cluster.map((cluster) => (
            <TreeItem
              label={cluster.label}
              nodeId={cluster.value}
              key={cluster.value}
            >
              {cluster?.children && renderCluster(cluster.children)}
            </TreeItem>
          ));
        })(clusters)}
      </TreeView>
    );
  }
}
