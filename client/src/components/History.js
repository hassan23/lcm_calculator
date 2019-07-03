import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    width: "300",
    marginTop: theme.spacing(3),
    margin: theme.spacing(1),
    overflowX: "auto"
  },
  table: {
    minWidth: 200
  }
}));

export default function History() {
  const [rows, updateRows] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.get("/get", {
        params: {
          email: "sr.hassan23@gmail.com"
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
    };
    fetchUserData();
  }, []);

  return (
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
