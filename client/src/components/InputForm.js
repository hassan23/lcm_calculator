import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Radio from "@material-ui/core/Radio";
import Box from "@material-ui/core/Box";
import "antd/dist/antd.css";
import { LCM, saveLCM } from "../utility";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  button: {
    margin: theme.spacing(1),
    marginTop: 25
  },
  input: {
    display: "none"
  },
  snackbar: {
    margin: theme.spacing(1),
    display: "flex",
    justifyContent: "center"
  }
}));

export default () => {
  const [numbers, addNumber] = useState([]);
  const [number, updateNumber] = useState("");
  const [LCMValue, updateLCM] = useState("");
  const [algo, setAlgo] = useState("Best time");
  const classes = useStyles();
  const onSubmit = e => {
    e.preventDefault();
    if (number && number !== -Infinity) addNumber([number, ...numbers]);
    updateNumber(-Infinity);
  };
  const onChange = event => {
    updateLCM("");
    updateNumber(event.target.value);
  };
  const calculateLCM = async () => {
    const resultLCM = LCM(numbers, algo);
    updateLCM(String(resultLCM));
    addNumber([]);
    updateNumber(-Infinity);
    if (numbers.length) saveLCM(resultLCM, algo, numbers);
  };
  return (
    <>
      <div>
        <Radio
          checked={algo === "Best time"}
          onChange={e => setAlgo(e.target.value)}
          value="Best time"
          name="radio-button-demo"
          inputProps={{ "aria-label": "A" }}
        />{" "}
        Best Time
        <Radio
          checked={algo === "Best space"}
          onChange={e => setAlgo(e.target.value)}
          value="Best space"
          name="radio-button-demo"
          inputProps={{ "aria-label": "B" }}
        />{" "}
        Best Space
        <Radio
          checked={algo === "Optimal"}
          onChange={e => setAlgo(e.target.value)}
          value="Optimal"
          name="radio-button-demo"
          inputProps={{ "aria-label": "C" }}
        />{" "}
        Optimal
      </div>
      <form onSubmit={onSubmit}>
        <TextField
          id="standard-with-placeholder"
          label="Number"
          value={number}
          onChange={onChange}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
        />
        <Button
          variant="contained"
          className={classes.button}
          color="primary"
          onClick={onSubmit}
        >
          Add Number
        </Button>
        <Typography
          component="div"
          variant="body1"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {numbers.map(n => (
            <Box
              style={{ marginLeft: 5 }}
              key={Math.random()}
              bgcolor="text.disabled"
              color="primary.contrastText"
              width={100}
              p={2}
              m={1}
            >
              {n}
            </Box>
          ))}
        </Typography>
        <Button
          variant="contained"
          className={classes.button}
          color="primary"
          onClick={calculateLCM}
        >
          Calculate LCM
        </Button>
        <Typography gutterBottom variant="h6" className={classes.snackbar}>
          {LCMValue === "" || LCMValue === "-Infinity" ? (
            ""
          ) : (
            <SnackbarContent
              message={`Lowest Common Multiple is ${LCMValue}`}
            />
          )}
        </Typography>
      </form>
    </>
  );
};
