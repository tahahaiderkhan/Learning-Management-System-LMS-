import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../config/firebase';
import PageHeader from '../../components/common/PageHeader';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import RadioButton from '../../components/common/RadioButton';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const SubjectAdd = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        subjectName: '',
        class: '',
        group: 'general',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "subjects"), {
                ...formData,
                createdAt: new Date()
            });
            navigate('/subjects');
        } catch (error) {
            console.error("Error adding subject: ", error);
            alert("Error adding subject");
        }
    };

    return (
        <Box>
            <PageHeader title="Add Subject" />
            <Paper elevation={3} sx={{ p: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Input
                                label="Subject Name"
                                name="subjectName"
                                value={formData.subjectName}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                label="Class"
                                name="class"
                                value={formData.class}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <RadioButton
                                label="Group"
                                name="group"
                                value={formData.group}
                                onChange={handleChange}
                                options={[
                                    { value: 'general', label: 'General' },
                                    { value: 'science', label: 'Science' },
                                    { value: 'arts', label: 'Arts' },
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit">Save Subject</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default SubjectAdd;
