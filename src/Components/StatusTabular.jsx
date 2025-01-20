import React from "react";
import { makeStyles, Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 1,
    margin: "0%",
    marginBottom: "1%",
    pending: "0%",
  },
  tableHeader: {
    backgroundColor: "#a1887f",
  },
  tableCell: {
    border: "solid",
    borderColor: "#dcded5",
  },
});
const StatusTabular = ({ statusData }) => {
  const storeValue = sessionStorage.getItem("store_value");
  const classes = useStyles();
  const rowcreater = (oneStatus) => {
    let rows = [];
    let count = 0;
    for (const property in oneStatus) {
      rows[count++] = (
        <TableCell key={count} className={classes.tableCell} align="center">
          {oneStatus[property]}
        </TableCell>
      );
    }
    return rows;
  };
  const columns = storeValue !== "L3" && statusData.col.length > 0 ? [...statusData.col, "REMAINING SKU COUNT"] : [...statusData.col];
  const TableData = statusData.row.map((eachItem) => {
    return {
      id: eachItem.id,
      consumerBase: eachItem.needState ? eachItem.needState : eachItem.consumerBase,
      totalSKU: eachItem.totalSku !== "N/A" ? eachItem.totalSku : "",
      feedbackGiven: (eachItem.totalSku !== "N/A" || eachItem.feedBackGiven !== "N/A") ? parseInt(eachItem.feedBackGiven ? eachItem.feedBackGiven : eachItem.saleable) : "",
      remainingSKUcount: (eachItem.totalSku !== "N/A" || eachItem.feedBackGiven !== "N/A") ? (parseInt(eachItem.totalSku ? eachItem.totalSku : eachItem.totalSKU) - parseInt(eachItem.feedBackGiven ? eachItem.feedBackGiven : 0)).toString() : "",
    };
  });

  const NATTableData = statusData.row.map((eachItem) => {
    return {
      consumerBase: eachItem.consumerBase,
      totalSKU: eachItem.totalSKU,
      remaining: eachItem.remaining,
      indented: eachItem.indented,
      totalQty: eachItem.totalQty,
      totalSdtWt: eachItem.totalSdtWt,
      tolValue: eachItem.tolValue,
    };
  });
  const TableDetails = storeValue === "L3" ? NATTableData : TableData;
  const TableColumns = storeValue === "L3" ? statusData.col : columns;

  return (
    <React.Fragment>
      {statusData.row.length > 0 ? <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead style={{ backgroundColor: "#832729" }}>
          <TableRow>
            {TableColumns.map((statusColoum, index) => (
              <TableCell
                className={classes.tableCell}
                key={index}
                align="center"
                style={{ color: "#ffff" }}
              >
                <Typography variant="h6">
                  {statusColoum.toUpperCase()}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {statusData.row && (
            TableDetails.map((statusColoum, index) => (
              <TableRow key={index}>
                {rowcreater(statusColoum)}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table> : <h3 className="text-center p-3">Data Not Available</h3>}
    </React.Fragment>
  );
};

export default StatusTabular;
