import React from "react";
import { useStyles } from "../../Style/FeedbackL1AndL2ForPhysical";


export const L1L2ProductsInfo = ({ feedShowState }) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <div className="pro_info">
                <h5 className="text-center my-1"><b>PRODUCT DETAILS</b></h5>
                <table className="w-100">
                    <tbody>
                        <tr>
                            <th className={classes.hadding}>COLLECTION</th>
                            <td>-</td>
                            <td className={classes.rowData}>{feedShowState.collection}</td>
                        </tr>
                        <tr>
                            <th className={classes.hadding}>NEEDSTATE</th>
                            <td>-</td>
                            <td className={classes.rowData}>
                                {feedShowState.consumerBase}
                            </td>
                        </tr>
                        <tr>
                            <th className={classes.hadding}>GROUP</th>
                            <td>-</td>
                            <td className={classes.rowData}>
                                {feedShowState.itGroup}
                            </td>
                        </tr>
                        <tr>
                            <th className={classes.hadding}>CATEGORY</th>
                            <td>-</td>
                            <td className={classes.rowData}>
                                {feedShowState.category}
                            </td>
                        </tr>
                        <tr>
                            <th className={classes.hadding}>GENDER</th>
                            <td>-</td>
                            <td className={classes.rowData}>
                                {feedShowState.gender}
                            </td>
                        </tr>
                        <tr>
                            <th className={classes.hadding}>COMPLEXCITY</th>
                            <td>-</td>
                            <td className={classes.rowData}>
                                {feedShowState.complexity}
                            </td>
                        </tr>
                        <tr>
                            <th className={classes.hadding}>STD WT.</th>
                            <td>-</td>
                            <td className={classes.rowData}>
                                {feedShowState.stdWt}
                            </td>
                        </tr>
                        <tr>
                            <th className={classes.hadding}>STD UCP</th>
                            <td>-</td>
                            <td className={classes.rowData}>
                                {feedShowState.stdUCP}
                            </td>
                        </tr>
                        <tr>
                            <th className={classes.hadding}>METAL COLOR</th>
                            <td>-</td>
                            <td className={classes.rowData}>
                                {feedShowState.metalColor}
                            </td>
                        </tr>
                        <tr>
                            <th className={classes.hadding}>{feedShowState.category === "CHAINS" ? "HOOK TYPE" : "FINDING"}</th>
                            <td>-</td>
                            <td className={classes.rowData}>
                                {feedShowState.findings}
                            </td>
                        </tr>
                        <tr>
                            <th className={classes.hadding}>CATPB</th>
                            <td>-</td>
                            <td className={classes.rowData}>{feedShowState.catPB}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}