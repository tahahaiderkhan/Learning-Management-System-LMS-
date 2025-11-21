import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../config/firebase';
import PageHeader from '../../components/common/PageHeader';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Select from '../../components/common/Select';
import DatePicker from '../../components/common/DatePicker';
import RadioButton from '../../components/common/RadioButton';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Admission = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dob: null,
        gender: 'male',
        class: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (newValue) => {
        setFormData(prev => ({ ...prev, dob: newValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "admissions"), {
                ...formData,
                dob: formData.dob ? formData.dob.toString() : null,
                admissionDate: new Date()
            });
            alert('Admission Form Submitted Successfully');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                dob: null,
                gender: 'male',
                class: '',
                address: ''
            });
        } catch (error) {
            console.error("Error submitting admission: ", error);
            alert("Error submitting admission");
        }
    };

    return (
        <Box>
            <PageHeader title="New Admission" />
            <Paper elevation={3} sx={{ p: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Input
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                label="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <DatePicker
                                label="Date of Birth"
                                value={formData.dob}
                                onChange={handleDateChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Select
                                label="Class"
                                name="class"
                                value={formData.class}
                                onChange={handleChange}
                                options={[
                                    { value: '1', label: 'Class 1' },
                                    { value: '2', label: 'Class 2' },
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <RadioButton
                                label="Gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                options={[
                                    { value: 'male', label: 'Male' },
                                    { value: 'female', label: 'Female' },
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                                label="Address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                multiline
                                rows={3}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit">Submit Admission</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default Admission;
