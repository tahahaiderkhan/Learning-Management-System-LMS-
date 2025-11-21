import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import MuiSelect from '@mui/material/Select';

const Select = ({ label, value, onChange, options, ...props }) => {
    return (
        <FormControl fullWidth margin="normal">
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                value={value}
                label={label}
                onChange={onChange}
                {...props}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </MuiSelect>
        </FormControl>
    );
};

export default Select;
