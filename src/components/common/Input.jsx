import React from 'react';
import TextField from '@mui/material/TextField';

const Input = ({ label, onChange, value, type = "text", required = false, ...props }) => {
    return (
        <TextField
            label={label}
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={onChange}
            value={value}
            type={type}
            required={required}
            {...props}
        />
    );
};

export default Input;
