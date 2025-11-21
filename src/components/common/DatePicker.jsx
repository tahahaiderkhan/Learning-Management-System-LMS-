import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';

const DatePicker = ({ label, value, onChange, ...props }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MuiDatePicker
                label={label}
                value={value}
                onChange={onChange}
                slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
                {...props}
            />
        </LocalizationProvider>
    );
};

export default DatePicker;
