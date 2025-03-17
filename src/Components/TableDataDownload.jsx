import React from "react";
import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";

const TableDataDownload = (fileName) => {
  return (
    <GridToolbarContainer>
      <GridToolbarExport csvOptions={{ fileName: fileName }} />
    </GridToolbarContainer>
  );
};

export default TableDataDownload;
