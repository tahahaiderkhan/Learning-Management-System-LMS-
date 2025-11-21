import React from 'react';
import { DataGrid as MuiDataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

const DataGrid = ({ rows, columns, pageSize = 5, rowsPerPageOptions = [5], ...props }) => {
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <MuiDataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: pageSize,
                        },
                    },
                }}
                pageSizeOptions={rowsPerPageOptions}
                disableRowSelectionOnClick
                {...props}
            />
        </Box>
    );
};

export default DataGrid;
