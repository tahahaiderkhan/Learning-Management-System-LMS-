import React from 'react';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from '../../config/firebase';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import DataGrid from '../../components/common/DataGrid';
import IconButton from '../../components/common/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

const StudentsList = () => {
    const navigate = useNavigate();

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First Name', width: 130 },
        { field: 'lastName', headerName: 'Last Name', width: 130 },
        { field: 'class', headerName: 'Class', width: 100 },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Box>
                    <IconButton
                        icon={<EditIcon />}
                        onClick={() => navigate(`/students/edit/${params.id}`)}
                        color="primary"
                        tooltip="Edit"
                    />
                    <IconButton
                        icon={<DeleteIcon />}
                        onClick={() => handleDelete(params.id)}
                        color="error"
                        tooltip="Delete"
                    />
                </Box>
            ),
        },
    ];

    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const fetchStudents = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "students"));
            const studentsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setRows(studentsData);
        } catch (error) {
            console.error("Error fetching students: ", error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchStudents();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            try {
                await deleteDoc(doc(db, "students", id));
                fetchStudents(); // Refresh list
            } catch (error) {
                console.error("Error deleting student: ", error);
                alert("Error deleting student");
            }
        }
    };

    return (
        <Box>
            <PageHeader
                title="Students"
                action={<Button onClick={() => navigate('/students/add')}>Add Student</Button>}
            />
            <DataGrid rows={rows} columns={columns} loading={loading} />
        </Box>
    );
};

export default StudentsList;
