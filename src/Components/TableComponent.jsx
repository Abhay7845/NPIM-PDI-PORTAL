import { makeStyles, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@material-ui/core";
import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import SingleImgCreator from "./SingleImgCreator";
import { imageUrl } from "../DataCenter/DataList";

const useStyles = makeStyles({
  tableHeader: {
    background: "black",
    color: "#e8eaf6",
  },
  tableCell: {
    color: "White",
  },
  searchBar: {
    align: "center",
    margin: "5%",
  },
});

const TableComponent = (props) => {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handlerChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handlerRowPerChange = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const onEditChange = (event) => {
    props.getProductData(event);
  };

  return (
    <React.Fragment>
      <Typography variant="h6">{props.reportName.toUpperCase()}</Typography>
      <div className="table-responsive">
        <Table className="table-hover border" style={{ marginTop: "0%", marginLeft: "0%" }}>
          <TableHead className={classes.tableHeader}>
            <TableRow>
              {props.coloum.map((column, index) => (
                <TableCell
                  key={index}
                  align="center"
                  className={column === "Action" ? "bg-secondary" : classes.tableCell}
                >
                  {column.toUpperCase()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.report.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
              <TableRow key={i}>
                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                >
                  {row.id}
                </TableCell>
                <TableCell align="center">
                  <SingleImgCreator
                    itemCode={row.itemCode ? row.itemCode : ""}
                    link={imageUrl}
                  />
                </TableCell>
                <TableCell align="center">{row.itemCode}</TableCell>
                <TableCell align="center">
                  {row.collection}
                </TableCell>
                <TableCell align="center">
                  {row.consumerBase}
                </TableCell>
                <TableCell align="center">{row.itGroup}</TableCell>
                <TableCell align="center">{row.category}</TableCell>
                <TableCell align="center">{row.stdWt}</TableCell>
                <TableCell align="center">{row.stdUCP}</TableCell>
                <TableCell className="text-center bg-secondary">
                  <EditIcon onClick={() => onEditChange(row)} cursor="pointer" />
                </TableCell>
                <TableCell align="center">{row.saleable}</TableCell>
                <TableCell align="center">{row.reasons}</TableCell>
                <TableCell align="center">
                  {row.quality_Rating}
                </TableCell>
                <TableCell align="center">
                  {row.quality_Reasons}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 30]}
          component="div"
          rowsPerPage={rowsPerPage}
          count={props.report.length}
          page={page}
          onChangePage={handlerChangePage}
          onChangeRowsPerPage={handlerRowPerChange}
        />
      </div>
    </React.Fragment>
  );
};
export default TableComponent;
