import { Grid, Container, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import LazyLoadindDataGrid from "../Components/LazyLoadindDataGrid";
import Loading from "../Components/Loading";
import UpperHeader from "../Components/UpperHeader";
import { APIClosePortal } from "../HostManager/CommonApiCallL3";

export default function PortelCloseReport(props) {
  const { storeCode, rsoName, level } = useParams();
  const [report, setReport] = useState({
    col: [],
    rows: [],
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    ReportRestCall();
  });

  function ReportRestCall() {
    APIClosePortal(`/NPIML3/npim/item/wise/rpt/L3/for/close/portel/${storeCode}/${level}`)
      .then((response) => {
        if (response.data.code === "1000") {
          setReport({
            col: response.data.coloum,
            rows: response.data.value,
          });
        } else {
          setReport({
            col: [],
            rows: [],
          });
        }
      }).catch((error) => setLoading(false));
    setLoading(false);
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12}>
        <UpperHeader itemCode={rsoName} storeCode={storeCode} />
        <Loading flag={loading} />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Container maxWidth="xl">
          <Paper>
            {report.rows.length > 0 && report.col.length > 0 ? (
              <LazyLoadindDataGrid
                col={report.col}
                rows={report.rows}
                autoHeight={true}
                autoPageSize={true}
              />
            ) : (
              <Typography align="center" variant="h5" color="secondary">
                No Data Found...!
              </Typography>
            )}
          </Paper>
        </Container>
      </Grid>
    </Grid>
  )
}
