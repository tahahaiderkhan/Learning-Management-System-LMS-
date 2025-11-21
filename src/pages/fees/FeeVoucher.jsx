import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const FeeVoucher = () => {
    return (
        <Box>
            <PageHeader title="Fee Voucher" />
            <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>LMS School System</Typography>
                <Typography variant="subtitle1">Fee Voucher</Typography>
                <Box sx={{ my: 3, textAlign: 'left' }}>
                    <Typography><strong>Student Name:</strong> John Doe</Typography>
                    <Typography><strong>Class:</strong> Class 1</Typography>
                    <Typography><strong>Month:</strong> January 2024</Typography>
                    <Typography><strong>Amount Due:</strong> $500</Typography>
                </Box>
                <Button onClick={() => window.print()}>Print Voucher</Button>
            </Paper>
        </Box>
    );
};

export default FeeVoucher;
