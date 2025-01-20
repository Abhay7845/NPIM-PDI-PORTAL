import React from "react";

const singleProductsDetailsDetails = (props) => {
  const { singleProductsDetails } = props;

  const Finger = !singleProductsDetails.childNodeF
    ? ""
    : singleProductsDetails.childNodeF.trim();

  const Harm = !singleProductsDetails.childNodeH
    ? ""
    : singleProductsDetails.childNodeH.trim();

  const tikka = !singleProductsDetails.childNodeK
    ? ""
    : singleProductsDetails.childNodeK.trim();

  const other = !singleProductsDetails.childNodeO
    ? ""
    : singleProductsDetails.childNodeO.trim();

  const bangle = !singleProductsDetails.childNodeV
    ? ""
    : singleProductsDetails.childNodeV.trim();

  const earing = !singleProductsDetails.childNodesE
    ? ""
    : singleProductsDetails.childNodesE.trim();

  const neckwear = !singleProductsDetails.childNodesN
    ? ""
    : singleProductsDetails.childNodesN.trim();

  return (
    <>
      <table className="table table-bordered mt-4">
        {!singleProductsDetails.childNodesE ? (
          ""
        ) : (
          <thead>
            <tr>
              <th scope="col">CATEGORY</th>
              <th scope="col">StdWt</th>
              <th scope="col">UCP</th>
            </tr>
          </thead>
        )}
        <tbody>
          {Finger === "" ? (
            ""
          ) : (
            <tr>
              <td>FINGER RING</td>
              <td>{singleProductsDetails.stdWtF}</td>
              <td>{singleProductsDetails.stdUcpF}</td>
            </tr>
          )}
          {earing === "" ? (
            ""
          ) : (
            <tr>
              <td>EAR RING</td>
              <td>{singleProductsDetails.stdWtE}</td>
              <td>{singleProductsDetails.stdUcpE}</td>
            </tr>
          )}
          {neckwear === "" ? (
            ""
          ) : (
            <tr>
              <td>NECKWEAR</td>
              <td>{singleProductsDetails.stdWtN}</td>
              <td>{singleProductsDetails.stdUcpN}</td>
            </tr>
          )}
          {Harm === "" ? (
            ""
          ) : (
            <tr>
              <td>HARAM</td>
              <td>{singleProductsDetails.stdWtH}</td>
              <td>{singleProductsDetails.stdUcpH}</td>
            </tr>
          )}
          {tikka === "" ? (
            ""
          ) : (
            <tr>
              <td>TIKKA</td>
              <td>{singleProductsDetails.stdWtK}</td>
              <td>{singleProductsDetails.stdUcpK}</td>
            </tr>
          )}
          {bangle === "" ? (
            ""
          ) : (
            <tr>
              <td>BANGLE</td>
              <td>{singleProductsDetails.stdWtV}</td>
              <td>{singleProductsDetails.stdUcpV}</td>
            </tr>
          )}
          {other === "" ? (
            ""
          ) : (
            <tr>
              <td>OTHER</td>
              <td>{singleProductsDetails.stdWtO}</td>
              <td>{singleProductsDetails.stdUcpO}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default singleProductsDetailsDetails;
