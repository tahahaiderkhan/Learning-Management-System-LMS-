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

const TeachersList = () => {
    const navigate = useNavigate();

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First Name', width: 130 },
        { field: 'lastName', headerName: 'Last Name', width: 130 },
        { field: 'subject', headerName: 'Subject', width: 130 },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Box>
                    <IconButton
                        icon={<EditIcon />}
                        onClick={() => navigate(`/teachers/edit/${params.id}`)}
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

    const fetchTeachers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "teachers"));
            const teachersData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setRows(teachersData);
        } catch (error) {
            console.error("Error fetching teachers: ", error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchTeachers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this teacher?")) {
            try {
                await deleteDoc(doc(db, "teachers", id));
                fetchTeachers();
            } catch (error) {
                console.error("Error deleting teacher: ", error);
                alert("Error deleting teacher");
            }
        }
    };

    return (
        <Box>
            <PageHeader
                title="Teachers"
                action={<Button onClick={() => navigate('/teachers/add')}>Add Teacher</Button>}
            />
            <DataGrid rows={rows} columns={columns} loading={loading} />
        </Box>
    );
};

export default TeachersList;
