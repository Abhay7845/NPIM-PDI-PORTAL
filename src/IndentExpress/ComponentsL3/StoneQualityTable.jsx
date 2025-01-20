import React from "react";

const StoneQualityTable = (props) => {
  const { tableRowData } = props;
  return (
    <div className="table-responsive">
      <table
        className="table table-bordered"
        style={{ backgroundColor: "#cbc9c9" }}
      >
        <thead>
          <tr>
            <th>SI_2GH</th>
            <th>VS_GH</th>
            <th>VVS1</th>
            <th>I2_GH</th>
            <th>SI2_IJ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{tableRowData.si2Gh}</td>
            <td>{tableRowData.vsGh}</td>
            <td>{tableRowData.vvs1}</td>
            <td>{tableRowData.i2Gh}</td>
            <td>{tableRowData.si2Ij}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StoneQualityTable;
