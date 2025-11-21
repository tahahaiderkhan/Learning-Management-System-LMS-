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

const SubjectsList = () => {
    const navigate = useNavigate();

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'subjectName', headerName: 'Subject Name', width: 200 },
        { field: 'class', headerName: 'Class', width: 130 },
        { field: 'group', headerName: 'Group', width: 130 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Box>
                    <IconButton
                        icon={<EditIcon />}
                        onClick={() => navigate(`/subjects/edit/${params.id}`)}
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

    const fetchSubjects = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "subjects"));
            const subjectsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setRows(subjectsData);
        } catch (error) {
            console.error("Error fetching subjects: ", error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchSubjects();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this subject?")) {
            try {
                await deleteDoc(doc(db, "subjects", id));
                fetchSubjects();
            } catch (error) {
                console.error("Error deleting subject: ", error);
                alert("Error deleting subject");
            }
        }
    };

    return (
        <Box>
            <PageHeader
                title="Subjects"
                action={<Button onClick={() => navigate('/subjects/add')}>Add Subject</Button>}
            />
            <DataGrid rows={rows} columns={columns} loading={loading} />
        </Box>
    );
};

export default SubjectsList;
