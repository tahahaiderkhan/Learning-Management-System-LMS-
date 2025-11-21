import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../config/firebase';
import PageHeader from '../../components/common/PageHeader';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const ClassForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        className: '',
        section: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "classes"), {
                ...formData,
                createdAt: new Date()
            });
            navigate('/classes');
        } catch (error) {
            console.error("Error adding class: ", error);
            alert("Error adding class");
        }
    };

    return (
        <Box>
            <PageHeader title="Add Class" />
            <Paper elevation={3} sx={{ p: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Input
                                label="Class Name"
                                name="className"
                                value={formData.className}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Input
                                label="Section"
                                name="section"
                                value={formData.section}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit">Save Class</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default ClassForm;
