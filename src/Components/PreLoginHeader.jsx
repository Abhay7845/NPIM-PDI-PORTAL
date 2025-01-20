import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Logo from "../images/Tanishq_Logo.png";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        backgroundColor: "#832729",
        color: "#ffff",
    },
    projectLogo: {
        flexGrow: 1,
    },
});

export default function UpperHeader() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" color="transparent">
                <Toolbar>
                    <div className={classes.projectLogo}>
                        <img src={Logo} alt="NOT LOADED" width="80" height="55" />
                    </div>
                    <Typography variant="h6">
                        NPIM
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
