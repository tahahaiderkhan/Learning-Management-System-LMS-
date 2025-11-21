import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../config/firebase';
import PageHeader from '../../components/common/PageHeader';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Select from '../../components/common/Select';
import DatePicker from '../../components/common/DatePicker';
import RadioButton from '../../components/common/RadioButton';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const TeacherAdd = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        gender: 'male',
        dob: null,
        address: '',
        phoneNumber: ''
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
            await addDoc(collection(db, "teachers"), {
                ...formData,
                dob: formData.dob ? formData.dob.toString() : null,
                createdAt: new Date()
            });
            navigate('/teachers');
        } catch (error) {
            console.error("Error adding teacher: ", error);
            alert("Error adding teacher");
        }
    };

    return (
        <Box>
            <PageHeader title="Add Teacher" />
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
                            <Select
                                label="Subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                options={[
                                    { value: 'math', label: 'Mathematics' },
                                    { value: 'science', label: 'Science' },
                                    { value: 'english', label: 'English' },
                                ]}
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
                            <Button type="submit">Save Teacher</Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => navigate('/teachers')}
                                sx={{ ml: 2 }}
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default TeacherAdd;
