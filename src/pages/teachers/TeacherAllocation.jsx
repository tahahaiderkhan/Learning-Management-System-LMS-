import React, { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import Select from '../../components/common/Select';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const TeacherAllocation = () => {
    const [formData, setFormData] = useState({
        teacherId: '',
        classId: '',
        subjectId: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert('Teacher Allocated Successfully');
    };

    return (
        <Box>
            <PageHeader title="Teacher Allocation" />
            <Paper elevation={3} sx={{ p: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Select
                                label="Teacher"
                                name="teacherId"
                                value={formData.teacherId}
                                onChange={handleChange}
                                options={[
                                    { value: '1', label: 'John Doe' },
                                    { value: '2', label: 'Jane Smith' },
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Select
                                label="Class"
                                name="classId"
                                value={formData.classId}
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
                                name="subjectId"
                                value={formData.subjectId}
                                onChange={handleChange}
                                options={[
                                    { value: 'math', label: 'Mathematics' },
                                    { value: 'science', label: 'Science' },
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit">Allocate Teacher</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default TeacherAllocation;
