import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const RadioButton = ({ label, value, onChange, options, row = true, ...props }) => {
    return (
        <FormControl margin="normal">
            <FormLabel id={`${label}-radio-buttons-group-label`}>{label}</FormLabel>
            <RadioGroup
                row={row}
                aria-labelledby={`${label}-radio-buttons-group-label`}
                name={label}
                value={value}
                onChange={onChange}
                {...props}
            >
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};

export default RadioButton;
