import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../config/firebase';
import PageHeader from '../../components/common/PageHeader';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Select from '../../components/common/Select';
import DatePicker from '../../components/common/DatePicker';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const ExamSchedule = () => {
    const [formData, setFormData] = useState({
        examName: '',
        class: '',
        subject: '',
        date: null,
        startTime: '',
        endTime: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (newValue) => {
        setFormData(prev => ({ ...prev, date: newValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "examSchedule"), {
                ...formData,
                date: formData.date ? formData.date.toString() : null,
                createdAt: new Date()
            });
            alert('Exam Scheduled Successfully');
            setFormData({
                examName: '',
                class: '',
                subject: '',
                date: null,
                startTime: '',
                endTime: ''
            });
        } catch (error) {
            console.error("Error scheduling exam: ", error);
            alert("Error scheduling exam");
        }
    };

    return (
        <Box>
            <PageHeader title="Schedule Exam" />
            <Paper elevation={3} sx={{ p: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Input
                                label="Exam Name"
                                name="examName"
                                value={formData.examName}
                                onChange={handleChange}
                                required
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
                        <Grid item xs={12} sm={6}>
                            <Select
                                label="Subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                options={[
                                    { value: 'math', label: 'Mathematics' },
                                    { value: 'science', label: 'Science' },
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <DatePicker
                                label="Date"
                                value={formData.date}
                                onChange={handleDateChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                label="Start Time"
                                name="startTime"
                                type="time"
                                value={formData.startTime}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                label="End Time"
                                name="endTime"
                                type="time"
                                value={formData.endTime}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit">Schedule Exam</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default ExamSchedule;
