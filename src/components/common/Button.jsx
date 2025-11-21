import React from 'react';
import MuiButton from '@mui/material/Button';

const Button = ({ children, onClick, type = "button", variant = "contained", color = "primary", ...props }) => {
    return (
        <MuiButton
            type={type}
            variant={variant}
            color={color}
            onClick={onClick}
            {...props}
        >
            {children}
        </MuiButton>
    );
};

export default Button;
