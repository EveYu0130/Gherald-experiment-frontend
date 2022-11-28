import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import InfoIcon from "@mui/icons-material/Info";

export default function InfoPopover({text1, text2}) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div>
            <InfoIcon sx={{ fontSize: 'medium' }} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}/>
            <Popover
                id="mouse-over-popover"
                sx={{
                    pointerEvents: 'none',
                    p: 3
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography variant="body2" sx={{ px: 3, py: 3 }}>{text1}</Typography>
                {/*<Typography variant="body1" sx={{ px: 3 }}>To mitigate the risk:</Typography>*/}
                {/*<Typography variant="body2" sx={{ px: 3, pb: 2 }}>{text2}</Typography>*/}
            </Popover>
        </div>
    );
}
