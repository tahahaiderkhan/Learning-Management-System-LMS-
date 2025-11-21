import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../config/firebase';
import PageHeader from '../../components/common/PageHeader';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Select from '../../components/common/Select';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const FeeSubmission = () => {
    const [formData, setFormData] = useState({
        studentId: '',
        amount: '',
        month: '',
        paymentMethod: 'cash',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "fees"), {
                ...formData,
                submittedAt: new Date()
            });
            alert('Fee Submitted Successfully');
            setFormData({
                studentId: '',
                amount: '',
                month: '',
                paymentMethod: 'cash',
            });
        } catch (error) {
            console.error("Error submitting fee: ", error);
            alert("Error submitting fee");
        }
    };

    return (
        <Box>
            <PageHeader title="Fee Submission" />
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
                                label="Amount"
                                name="amount"
                                type="number"
                                value={formData.amount}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Select
                                label="Month"
                                name="month"
                                value={formData.month}
                                onChange={handleChange}
                                options={[
                                    { value: 'jan', label: 'January' },
                                    { value: 'feb', label: 'February' },
                                    { value: 'mar', label: 'March' },
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Select
                                label="Payment Method"
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleChange}
                                options={[
                                    { value: 'cash', label: 'Cash' },
                                    { value: 'card', label: 'Card' },
                                    { value: 'online', label: 'Online' },
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit">Submit Fee</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default FeeSubmission;
