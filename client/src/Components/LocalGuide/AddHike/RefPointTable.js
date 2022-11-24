import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function RefPointTable(props) {
    const {points} = props;
    const columns = [
        {field: 'description', headerName: 'DESCRIPTION', flex:1},
        {field: 'value', headerName: 'NAME/ADDRESS', flex:1},
        {field: 'latitude', headerName: 'LATITUDE', flex:1},
        {field: 'longitude', headerName: 'LONGITUDE', flex:1},
        {field: 'deleteRow', headerName: '', flex:1,
        sortable: false,
        align:'center',
        headerAlign:'center',
        renderCell: (params) => {
          return (
            <Button
              onClick={(e) => console.log(params.row)}
              variant="contained"
              color='error'
            >
              Delete
            </Button>
          );
        }}
    ]
    const rows = points.map(a => {return {
        id:(a.longitude+""+a.latitude),
        description: a.description,
        value:(a.type=="gps"? "": a.value),
        longitude:a.longitude,
        latitude:a.latitude,}})
  return <>
    {points.length > 0 ?
    <div style={{ height: 250, width: '75%' } }>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={points.length > 5 ? 5 : points.length}
        rowsPerPageOptions={[points.length > 5 ? 5 : points.length]}
        disableSelectionOnClick
      />
    </div> : <></>}</>
  ;
}
