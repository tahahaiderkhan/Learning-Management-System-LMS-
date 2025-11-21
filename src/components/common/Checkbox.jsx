import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

const CheckboxInput = ({ label, checked, onChange, ...props }) => {
    return (
        <FormGroup>
            <FormControlLabel
                control={<Checkbox checked={checked} onChange={onChange} {...props} />}
                label={label}
            />
        </FormGroup>
    );
};

export default CheckboxInput;
