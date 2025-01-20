import React from "react";

const StaticTabularInformation = (props) => {
  return (
    <table className="table table-bordered text-center">
      <thead>
        <tr>
          {props.vsGh && <th>VS_GH</th>}
          {props.vvs1 && <th>VVS1</th>}
          {props.i2Gh && <th>I2_GH</th>}
          {props.si2Gh && <th>SI2_GH</th>}
          {props.si2Ij && <th>{props.si2Ij && "I1_JKL"}</th>}
        </tr>
      </thead>
      <tbody>
        <tr>
          {/* {props.vsGh && <td>{props.vsGh}</td>} */}
          {props.vsGh && <td>{props.vsGh}</td>}
          {props.vvs1 && <td>{props.vvs1}</td>}
          {props.i2Gh && <td>{props.i2Gh}</td>}
          {props.si2Gh && <td>{props.si2Gh}</td>}
          {props.si2Ij && <td>{props.si2Ij}</td>}
        </tr>
      </tbody>
    </table>
  );
};

export default StaticTabularInformation;
