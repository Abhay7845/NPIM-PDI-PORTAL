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
const StatusTabularL1L2 = ({ statusData }) => {
    const classes = useStyles();
    const tabelData = statusData.row.map((item, i) => {
        return {
            id: i,
            needState: item.needstate,
            totalSku: item.totalSku,
            feedbackGiven: item.feedbackGiven,
            remainingSKUcount: Number(item.totalSku) - Number(item.feedbackGiven)
        }
    })
    return (
        <React.Fragment>
            {statusData.row.length > 0 ? <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead style={{ backgroundColor: "#832729" }}>
                    <TableRow>
                        {statusData.col.map((statusColoum, index) => (
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
                        tabelData.map((statusColoum, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell className={classes.tableCell} align="center">{index + 1}</TableCell>
                                    <TableCell className={classes.tableCell}>{statusColoum.needState}</TableCell>
                                    <TableCell className={classes.tableCell} align="center">{statusColoum.totalSku}</TableCell>
                                    <TableCell className={classes.tableCell} align="center">{statusColoum.feedbackGiven}</TableCell>
                                    <TableCell className={classes.tableCell} align="center">{statusColoum.remainingSKUcount || "N/A"}</TableCell>
                                </TableRow>)
                        })
                    )}
                </TableBody>
            </Table> : <h3 className="text-center p-3">Data Not Available</h3>
            }
        </React.Fragment>
    );
};

export default StatusTabularL1L2;
