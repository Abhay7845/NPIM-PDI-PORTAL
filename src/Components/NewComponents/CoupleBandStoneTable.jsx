import React from "react";

const CoupleBandStoneTable = () => {
    return (
        <React.Fragment>
            <table className="table table-bordered ml-0 mx-2">
                <thead>
                    <tr>
                        <th>SIZE CODE</th>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                        <th>6</th>
                        <th>7</th>
                        <th>8</th>
                        <th>9</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">SIZE COMBINATION</th>
                        <td>M + R</td>
                        <td>M + S</td>
                        <td>M + T</td>
                        <td>L + R</td>
                        <td>L + S</td>
                        <td>L + T</td>
                        <td>N + R</td>
                        <td>N + S</td>
                        <td>N + T</td>
                    </tr>
                </tbody>
            </table>
        </React.Fragment>)
}

export default CoupleBandStoneTable;