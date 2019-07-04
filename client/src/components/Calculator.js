import React, { useState } from "react";
import "typeface-roboto";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import InputForm from "./InputForm";
import History from "./History";
import GoogleLogin from "./googleLogin";

const useStyles = makeStyles({
  bigAvatar: {
    margin: 10,
    width: 100,
    height: 100,
    justifyContent: "center"
  }
});

export default () => {
  const [isLogin, setLogin] = useState(false);
  const [refresh, updateRefresh] = useState(false);
  const classes = useStyles();
  return !isLogin ? (
    <>
      <Typography variant="h5" component="h6">
        Welcome to LCM calculator
      </Typography>
      <GoogleLogin isLogin={isLogin} setLogin={setLogin} />
    </>
  ) : (
    <>
      <Grid container justify="center" alignItems="center">
        <Avatar
          alt="Remy Sharp"
          src={localStorage.getItem("image")}
          className={classes.bigAvatar}
        />
      </Grid>

      <Typography variant="h5" component="h6">
        Hey, {localStorage.getItem("username")} lets calculate some LCMs
      </Typography>
      <GoogleLogin isLogin={isLogin} setLogin={setLogin} />
      <InputForm updateRefresh={updateRefresh} refresh={refresh} />
      <History refresh={refresh} />
    </>
  );
};
