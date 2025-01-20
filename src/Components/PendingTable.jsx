import React, { useState } from "react";
import { makeStyles, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@material-ui/core";
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

const PendingTable = (props) => {
    const classes = useStyles();
    const [rowsPerPage, setRowsPerPage] = useState(50);
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
                                        itemCode={row.itemCode || ""}
                                        link={imageUrl}
                                    />
                                </TableCell>
                                {props.reportName === "submitted" ?
                                    <React.Fragment>
                                        <TableCell align="center">{row.doe}</TableCell>
                                        <TableCell align="center">{row.strCode}</TableCell>
                                        <TableCell align="center"> {row.region} </TableCell>
                                        <TableCell align="center">{row.needstate}</TableCell>
                                        <TableCell align="center">{row.collection}</TableCell>
                                        <TableCell align="center">{row.catPB || "N/A"}</TableCell>
                                        <TableCell align="center">{row.itemCode}</TableCell>
                                        <TableCell className="text-center bg-secondary"><EditIcon onClick={() => onEditChange(row)} cursor="pointer" /></TableCell>
                                        <TableCell align="center">{row.activity}</TableCell>
                                        <TableCell align="center">{row.itgroup}</TableCell>
                                        <TableCell align="center">{row.category}</TableCell>
                                        <TableCell align="center">{row.q1_Rating}</TableCell>
                                        <TableCell align="center">{row.q2_Rating}</TableCell>
                                        <TableCell align="center">{row.q3_Rating}</TableCell>
                                        <TableCell align="center">{row.q4_Rating}</TableCell>
                                        <TableCell align="center">{row.specificFeedback}</TableCell>
                                        <TableCell align="center">{row.overallProductPercentage}%</TableCell>
                                    </React.Fragment> : <React.Fragment>
                                        <TableCell align="center">{row.itemCode || "N/A"}</TableCell>
                                        <TableCell align="center">{row.collection}</TableCell>
                                        <TableCell align="center">{row.needstate}</TableCell>
                                        <TableCell align="center">{row.itgroup}</TableCell>
                                        <TableCell align="center">{row.category}</TableCell>
                                        <TableCell align="center">{row.catPB || "N/A"}</TableCell>
                                        <TableCell className="text-center bg-secondary"><EditIcon onClick={() => onEditChange(row)} cursor="pointer" /></TableCell>
                                        <TableCell align="center">{row.stdWt}</TableCell>
                                        <TableCell align="center">{row.stdUCP}</TableCell>
                                        <TableCell align="center">{row.complexity || "N/A"}</TableCell>
                                        <TableCell align="center">{row.findings || "N/A"}</TableCell>
                                        <TableCell align="center">{row.metalColor}</TableCell>
                                    </React.Fragment>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[50, 100, 150, 200, props.report.length]}
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
export default PendingTable;
