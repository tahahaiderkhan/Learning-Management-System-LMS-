import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const PageHeader = ({ title, action }) => {
    return (
        <Box className="page-header">
            <Typography variant="h4" component="h1" gutterBottom>
                {title}
            </Typography>
            {action && (
                <Box>
                    {action}
                </Box>
            )}
        </Box>
    );
};

export default PageHeader;
