import React from 'react';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from '../../config/firebase';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/common/Button';
import DataGrid from '../../components/common/DataGrid';
import IconButton from '../../components/common/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

const SyllabusList = () => {
    const navigate = useNavigate();

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Title', width: 200 },
        { field: 'subject', headerName: 'Subject', width: 130 },
        { field: 'class', headerName: 'Class', width: 130 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Box>
                    <IconButton
                        icon={<DownloadIcon />}
                        onClick={() => console.log('Download', params.id)}
                        color="primary"
                        tooltip="Download"
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

    const fetchSyllabus = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "syllabus"));
            const syllabusData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setRows(syllabusData);
        } catch (error) {
            console.error("Error fetching syllabus: ", error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchSyllabus();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this syllabus?")) {
            try {
                await deleteDoc(doc(db, "syllabus", id));
                fetchSyllabus();
            } catch (error) {
                console.error("Error deleting syllabus: ", error);
                alert("Error deleting syllabus");
            }
        }
    };

    return (
        <Box>
            <PageHeader
                title="Syllabus"
                action={<Button onClick={() => navigate('/syllabus/add')}>Add Syllabus</Button>}
            />
            <DataGrid rows={rows} columns={columns} loading={loading} />
        </Box>
    );
};

export default SyllabusList;
