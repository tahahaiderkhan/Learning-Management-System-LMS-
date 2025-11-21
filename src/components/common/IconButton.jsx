import React from 'react';
import MuiIconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const IconButton = ({ icon, onClick, tooltip, color = "default", ...props }) => {
    const button = (
        <MuiIconButton onClick={onClick} color={color} {...props}>
            {icon}
        </MuiIconButton>
    );

    if (tooltip) {
        return (
            <Tooltip title={tooltip}>
                {button}
            </Tooltip>
        );
    }

    return button;
};

export default IconButton;
