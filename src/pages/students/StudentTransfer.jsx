import React, { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Select from '../../components/common/Select';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const StudentTransfer = () => {
    const [formData, setFormData] = useState({
        studentId: '',
        currentClass: '',
        transferToSchool: '',
        reason: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert('Transfer Initiated');
    };

    return (
        <Box>
            <PageHeader title="Transfer Student" />
            <Paper elevation={3} sx={{ p: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Input
                                label="Student ID"
                                name="studentId"
                                value={formData.studentId}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                label="Current Class"
                                name="currentClass"
                                value={formData.currentClass}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                                label="Transfer To (School Name)"
                                name="transferToSchool"
                                value={formData.transferToSchool}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                                label="Reason for Transfer"
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                multiline
                                rows={3}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" color="warning">Initiate Transfer</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default StudentTransfer;
