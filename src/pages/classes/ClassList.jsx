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

const ClassList = () => {
    const navigate = useNavigate();

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'className', headerName: 'Class Name', width: 150 },
        { field: 'section', headerName: 'Section', width: 100 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Box>
                    <IconButton
                        icon={<EditIcon />}
                        onClick={() => navigate(`/classes/edit/${params.id}`)}
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

    const fetchClasses = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "classes"));
            const classesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setRows(classesData);
        } catch (error) {
            console.error("Error fetching classes: ", error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchClasses();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this class?")) {
            try {
                await deleteDoc(doc(db, "classes", id));
                fetchClasses();
            } catch (error) {
                console.error("Error deleting class: ", error);
                alert("Error deleting class");
            }
        }
    };

    return (
        <Box>
            <PageHeader
                title="Classes"
                action={<Button onClick={() => navigate('/classes/add')}>Add Class</Button>}
            />
            <DataGrid rows={rows} columns={columns} loading={loading} />
        </Box>
    );
};

export default ClassList;
