import React from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../config/firebase';
import PageHeader from '../../components/common/PageHeader';
import DataGrid from '../../components/common/DataGrid';
import Box from '@mui/material/Box';

const ExamResult = () => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'studentName', headerName: 'Student Name', width: 200 },
        { field: 'class', headerName: 'Class', width: 130 },
        { field: 'subject', headerName: 'Subject', width: 130 },
        { field: 'marks', headerName: 'Marks', width: 100 },
        { field: 'grade', headerName: 'Grade', width: 100 },
    ];

    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchExamResults = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "examResults"));
                const resultsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setRows(resultsData);
            } catch (error) {
                console.error("Error fetching exam results: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchExamResults();
    }, []);

    return (
        <Box>
            <PageHeader title="Exam Results" />
            <DataGrid rows={rows} columns={columns} loading={loading} />
        </Box>
    );
};

export default ExamResult;
