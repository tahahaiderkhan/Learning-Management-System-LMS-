import React from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../config/firebase';
import PageHeader from '../../components/common/PageHeader';
import DataGrid from '../../components/common/DataGrid';
import Button from '../../components/common/Button';
import Box from '@mui/material/Box';

const FeeStructure = () => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'class', headerName: 'Class', width: 130 },
        { field: 'monthlyFee', headerName: 'Monthly Fee', width: 150 },
        { field: 'yearlyFee', headerName: 'Yearly Fee', width: 150 },
    ];

    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchFeeStructure = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "feeStructure"));
                const feeData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setRows(feeData);
            } catch (error) {
                console.error("Error fetching fee structure: ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeeStructure();
    }, []);

    return (
        <Box>
            <PageHeader title="Fee Structure" action={<Button>Update Structure</Button>} />
            <DataGrid rows={rows} columns={columns} loading={loading} />
        </Box>
    );
};

export default FeeStructure;
