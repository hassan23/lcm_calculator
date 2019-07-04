import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    width: "300",
    marginTop: theme.spacing(3),
    margin: theme.spacing(1),
    overflowX: "auto"
  },
  table: {
    minWidth: 200
  },
  progress: {
    margin: theme.spacing(2)
  }
}));

export default function History({ refresh }) {
  const [rows, updateRows] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const response = await axios.get("/get", {
        params: {
          email: localStorage.getItem("email")
        }
      });
      const data = response.data.map(v => {
        const d = new Date(0);
        d.setUTCSeconds(Math.floor(v.time / 1000));
        v.timeStamp = d.toDateString();
        console.log(v.time);
        return v;
      });
      updateRows(data);
      setLoading(false);
    };
    fetchUserData();
  }, [refresh]);

  return isLoading ? (
    <CircularProgress className={classes.progress} />
  ) : (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Numbers</TableCell>
            <TableCell align="right">LCM</TableCell>
            <TableCell>Algo type</TableCell>
            <TableCell>Complexity</TableCell>
            <TableCell>Calculated On</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.time}>
              <TableCell component="th" scope="row">
                {row.numbers.join(", ")}
              </TableCell>
              <TableCell align="right">{row.lcm}</TableCell>
              <TableCell>{row.algo}</TableCell>
              <TableCell>{row.complexity}</TableCell>
              <TableCell>{row.timeStamp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
