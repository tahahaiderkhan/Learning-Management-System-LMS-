import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../config/firebase';
import PageHeader from '../../components/common/PageHeader';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Select from '../../components/common/Select';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const SyllabusForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        subject: '',
        class: '',
        title: '',
        description: '',
        file: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "syllabus"), {
                ...formData,
                file: null, // File upload requires Firebase Storage, skipping for now
                createdAt: new Date()
            });
            navigate('/syllabus');
        } catch (error) {
            console.error("Error adding syllabus: ", error);
            alert("Error adding syllabus");
        }
    };

    return (
        <Box>
            <PageHeader title="Add Syllabus" />
            <Paper elevation={3} sx={{ p: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Input
                                label="Title"
                                name="title"
                                value={formData.title}
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
                        <Grid item xs={12}>
                            <Input
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button component="label" variant="outlined">
                                Upload Syllabus File (PDF)
                                <input type="file" hidden />
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit">Save Syllabus</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default SyllabusForm;
