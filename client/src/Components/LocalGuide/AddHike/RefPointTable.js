import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';

export default function RefPointTable(props) {
    const {points} = props;
    return (
      <>
      {points.length > 0 ?
      <TableContainer component={Paper} sx={{ width: '70%', m:2}}>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">DESCRIPTION</TableCell>
              <TableCell align="center">NAME/ADDRESS</TableCell>
              <TableCell align="center">LATITUDE</TableCell>
              <TableCell align="center">LONGITUDE</TableCell>
              <TableCell align="center" sx={{ width:80}}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {points.map((point) => (
              <TableRow
                key={point.longitude+""+point.latitude}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {point.description}
                </TableCell>
                <TableCell align="center">{point.type==="gps"? "": point.value}</TableCell>
                <TableCell align="center">{point.latitude}</TableCell>
                <TableCell align="center">{point.longitude}</TableCell>
                <TableCell>
                <Stack direction="row" alignItems="center" justifyContent="center"> 
                <IconButton aria-label="edit"
                    onClick={(e) => props.editPoint(point.latitude, point.longitude)}
                    variant="outlined"
                    color='primary'
                    disabled={!props.canDelete}
                  >
                  <EditIcon/>
                </IconButton>
                <IconButton aria-label="delete"
                    onClick={(e) => props.deletePoint(point.latitude, point.longitude)}
                    variant="contained"
                    color='error'
                    disabled={!props.canDelete}
                  >
                  <DeleteIcon/>
                </IconButton>
                </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> : <></>}</>
    );
  ;
}
