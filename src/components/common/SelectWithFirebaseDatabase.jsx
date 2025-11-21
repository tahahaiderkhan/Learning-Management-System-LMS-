import React, { useEffect, useState } from 'react';
import Select from './Select';
import { db } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

const SelectWithFirebaseDatabase = ({ label, collectionName, value, onChange, fieldLabel = 'name', fieldValue = 'id', ...props }) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, collectionName));
                const fetchedOptions = querySnapshot.docs.map(doc => ({
                    value: doc[fieldValue] || doc.id,
                    label: doc.data()[fieldLabel]
                }));
                setOptions(fetchedOptions);
            } catch (error) {
                console.error("Error fetching documents: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOptions();
    }, [collectionName, fieldLabel, fieldValue]);

    if (loading) {
        return <div>Loading...</div>; // Or a proper skeleton/spinner
    }

    return (
        <Select
            label={label}
            value={value}
            onChange={onChange}
            options={options}
            {...props}
        />
    );
};

export default SelectWithFirebaseDatabase;
