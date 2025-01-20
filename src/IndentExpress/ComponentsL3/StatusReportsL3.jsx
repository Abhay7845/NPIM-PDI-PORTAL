/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "../Style/TopHeader.css";
import Tippy from "@tippyjs/react";
import axios from "axios";
import { L1L2StatusHeading } from "../Data/DataList";
import { Link } from "react-router-dom";
import { BsFillBarChartFill, BsFillHouseDoorFill } from "react-icons/bs";
import { INDENT_HOST_URL } from "../../HostManager/UrlManager";
import UpperHeader from "../../Components/UpperHeader";
import Loader from "../../Components/Loader";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

const StatusReportsL3 = () => {
  const [loading, setLoading] = useState(false);
  const [statusData, setStatusData] = useState([]);
  const storeCode = sessionStorage.getItem("store_code");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${INDENT_HOST_URL}/INDENT/express/status/L1/${storeCode}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setStatusData(response.data.value);
        } else if (response.data.code === "1001") {
          alert("Data Not Found");
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [storeCode]);

  const TableData = statusData.map((item) => {
    return {
      id: item.id,
      consumerBase: item.consumerBase,
      totalSKU: item.totalSKU,
      saleable: item.saleable,
      notSaleable: item.notSaleable,
      remainingSKU: (
        parseInt(item.totalSKU) -
        parseInt(item.saleable) -
        parseInt(item.notSaleable)
      ).toString(),
    };
  });

  return (
    <React.Fragment>
      <UpperHeader />
      {loading === true && <Loader />}
      <div className='DropDownFormStyle'>
        <Tippy content='Home'>
          <Link to='/NpimPortal/Indent-express/direction/home'>
            <BsFillHouseDoorFill size={25} className='mt-2 mx-3 text-dark' />
          </Link>
        </Tippy>
        <Tippy content='Status Report'>
          <Link to='/NpimPortal/Indent-express/L3/status/reports'>
            <BsFillBarChartFill size={25} className='mt-2 text-dark' />
          </Link>
        </Tippy>
      </div>
      <br />
      {statusData.length > 0 && (
        <Table className='table table-hover table-bordered' style={{ marginLeft: "10px" }}>
          <Thead>
            <Tr>
              {L1L2StatusHeading.map((item, i) => {
                return (
                  <Th key={i} className='StatusTableHeading'>
                    {item.label}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {TableData.map((item, i) => {
              return (
                <Tr key={i} className='StatusTableRowData'>
                  <Td>{item.id}</Td>
                  <Td>{item.consumerBase}</Td>
                  <Td>{item.totalSKU}</Td>
                  <Td>{item.saleable}</Td>
                  <Td>{item.notSaleable}</Td>
                  <Td>{item.remainingSKU}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
    </React.Fragment>
  );
};

export default StatusReportsL3;
