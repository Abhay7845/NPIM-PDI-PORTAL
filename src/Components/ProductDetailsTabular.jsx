import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  heading: {
    fontWeight: 500,
    fontSize: "14px",
    fontStretch: "normal",
    fontFamily: "Raleway, sans-serif",
  },
  rowData: {
    fontWeight: 500,
    fontFamily: "Playfair Display,seri",
    fontSize: "14px",
    letterSpacing: "1px",
  },
});

const ProductDetailsTabular = (props) => {
  const classes = useStyles();
  return (
    <div>
      <table className="w-100">
        <tbody>
          <tr>
            <th className={classes.heading}>COLLECTION</th>
            <td className={classes.rowData}>
              - {props.information.collection}
            </td>
          </tr>
          <tr>
            <th className={classes.heading}>NEED STATE</th>
            <td className={classes.rowData}>
              - {props.information.consumerBase}
            </td>
          </tr>
          <tr>
            <th className={classes.heading}>GROUP</th>
            <td className={classes.rowData}>- {props.information.itGroup}</td>
          </tr>
          <tr>
            <th className={classes.heading}>CATEGORY</th>
            <td className={classes.rowData}>- {props.information.category}</td>
          </tr>
          <tr>
            <th className={classes.heading}>GENDER</th>
            <td className={classes.rowData}>- {props.information.gender}</td>
          </tr>
          <tr>
            <th className={classes.heading}>COMPLEXITY</th>
            <td className={classes.rowData}>
              - {props.information.complexity}
            </td>
          </tr>
          <tr>
            <th className={classes.heading}>STD WT</th>
            <td className={classes.rowData}>- {props.information.stdWt}</td>
          </tr>
          <tr>
            <th className={classes.heading}>STD UCP</th>
            <td className={classes.rowData}>- {props.information.stdUCP}</td>
          </tr>
          <tr>
            <th className={classes.heading}>METAL COLOUR</th>
            <td className={classes.rowData}>
              - {props.information.metalColor}
            </td>
          </tr>
          <tr>
            <th className={classes.heading}>{props.information.category.toUpperCase() === "CHAINS" ? "HOOK TYPE" : "FINDINGS"}</th>
            <td className={classes.rowData}>-{props.information.findings}</td>
          </tr>
          <tr>
            <th className={classes.heading}>SHAPE</th>
            <td className={classes.rowData}>
              - {props.information.shape.toUpperCase()}
            </td>
          </tr>
          <tr>
            <th className={classes.heading}>CAT PB</th>
            <td className={classes.rowData}>
              - {props.information.catPB}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetailsTabular;
