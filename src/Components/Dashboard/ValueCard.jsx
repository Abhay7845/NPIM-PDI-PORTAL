import React from "react";

const ValueCard = ({ data }) => {
  const cardStyle = {
    backgroundColor: "#f9f9f9",
    borderRadius: "5px",
    padding: "20px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const ArrayTolSdtWt = data.map((item) => Number(item.stdWt));
  const TotalSdtWt =
    ArrayTolSdtWt.length > 0
      ? ArrayTolSdtWt.reduce((acc, val) => acc + val)
      : 0;

  const ArrayIndQty = data.map((item) => Number(item.indQty));
  const TotalIndQty =
    ArrayIndQty.length > 0 ? ArrayIndQty.reduce((acc, val) => acc + val) : 0;

  const ArrayTolCost = data.map((item) => Number(item.totCost));
  const TotalCost =
    ArrayTolCost.length > 0 ? ArrayTolCost.reduce((acc, val) => acc + val) : 0;

  return (
    <div className="row row-cols-1 row-cols-md-2 g-4 mx-0 mt-1">
      <div className="col-md-4">
        <div style={cardStyle}>
          <h6 className="card-title text-secondary">
            Total Plain Indent (In kg)
          </h6>
          <b>{parseFloat(TotalSdtWt / 1000).toFixed(2)}</b>
        </div>
      </div>
      <div className="col-md-4">
        <div style={cardStyle}>
          <h6 className="card-title text-secondary">
            Total Value Studded (In Crs)
          </h6>
          <b>{parseFloat(TotalCost / 10000000).toFixed(3)}</b>
        </div>
      </div>
      <div className="col-md-4">
        <div style={cardStyle}>
          <h6 className="card-title text-secondary">Total Indent Quntity</h6>
          <b>{TotalIndQty}</b>
        </div>
      </div>
    </div>
  );
};

export default ValueCard;
