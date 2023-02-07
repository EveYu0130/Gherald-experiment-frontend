import React, { useState } from 'react';
import {ReactComponent as GheraldIcon} from "../../../icons/gherald.svg";
import {Box, Popover, Typography, SvgIcon, Rating, Grid} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useTranslation } from 'react-i18next';


export default function AuthorPopover({author, change}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const { t } = useTranslation();

    const handlePopoverOpen = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div>
            {/*<SvgIcon component={GheraldIcon} inheritViewBox onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}/>*/}
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
                {/*<Typography variant="h6" sx={{ px: 3, pt: 2 }}>{author.name} — {author.email}</Typography>*/}
                {/*<Typography variant="subtitle1" sx={{ px: 3, pt: 2 }}>*/}
                {/*    The author has made {change.authorPriorChanges} prior changes in the current project.*/}
                {/*</Typography>*/}
                <Box sx={{ px: 3, py: 2 }}>
                    <Grid container spacing={2} sx={{ p: 2, width: 400}} >
                        <Grid item xs={6}>{t('gherald_report_author_risk_project_exp')}</Grid>
                        <Grid item xs={6}>
                            <Rating name="read-only" value={change.authorPriorChangeScore * 5} readOnly precision={0.05}/>
                        </Grid>
                        <Grid item xs={6}>{t('gherald_report_author_risk_recent_activity')}</Grid>
                        <Grid item xs={6}>
                            <Rating name="read-only" value={change.authorRecentChangeScore * 5} readOnly precision={0.05}/>
                        </Grid>
                        <Grid item xs={6}>{t('gherald_report_author_risk_file_expertise')}</Grid>
                        <Grid item xs={6}>
                            <Rating name="read-only" value={change.authorFileAwareness * 5} readOnly precision={0.05}/>
                        </Grid>
                    </Grid>
                    {/*<Typography component="legend">Author prior changes</Typography>*/}
                    {/*<Rating name="read-only" value={change.authorPriorChangeScore * 5} readOnly />*/}
                    {/*<Typography component="legend">Author recent changes</Typography>*/}
                    {/*<Rating name="read-only" value={change.authorRecentChangeScore * 5} readOnly />*/}
                    {/*<Typography component="legend">Author file awareness</Typography>*/}
                    {/*<Rating name="read-only" value={change.authorFileAwareness * 5} readOnly />*/}
                </Box>
                {/*<Typography variant="subtitle1" sx={{ px: 3, pb: 2 }}>*/}
                {/*    AUTHOR risk score: {(riskScore * 100).toFixed(2)}%*/}
                {/*</Typography>*/}
            </Popover>
        </div>
    );
}
