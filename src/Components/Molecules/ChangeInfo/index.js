import React from 'react';
import {
    Typography,
    Box,
    IconButton,
    AppBar,
    Toolbar,
    SvgIcon,
    Grid,
    Rating,
} from '@mui/material';
import styled from "styled-components";
import AuthorPopover from "../../Atoms/AuthorPopover";
import GheraldReport from "../GheraldReport";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FileDiff from "../FileDiff";

import { ReactComponent as GheraldIcon } from '../../../icons/gherald.svg';
import InfoPopover from "../../Atoms/InfoPopover";
import {useAuth} from "../../../auth";
import WarningIcon from '@mui/icons-material/Warning';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useTranslation } from 'react-i18next';

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff3d47',
    }
});

function RiskRating(props) {
    const value = props.value;
    return (
        <StyledRating
            name="customized-color"
            value={value}
            precision={0.05}
            readOnly
            icon={<WarningIcon fontSize="inherit" />}
            emptyIcon={<WarningAmberIcon fontSize="inherit" />}
        />
    )
}

function Item(props) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
                border: '1px solid',
                borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                p: 1,
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
                ...sx,
            }}
            {...other}
        />
    );
}

function NewlineText(props) {
    const text = props.text;
    if (text) {
        return (<p>{text}</p>);
    } else {
        return (<br />);
    }
}

function ChangeInfo({ change, number }) {
    let auth = useAuth();
    const { t } = useTranslation();

    const handleOpenWindow = (e) => {
        e.preventDefault();
        let url = '';
        if (change.project === "huawei") {
            url = `https://gitee.com/${change.repo}/tree/${change.parent}`;
        } else if (change.project === "gerrit") {
            url = `https://github.com/GerritCodeReview/${change.repo}/tree/${change.parent}`;
        } else {
            url = `https://github.com/${change.repo}/tree/${change.parent}`;
        }
        // const url = change.project === "huawei" ? `https://gitee.com/${change.repo}/tree/${change.parent}` : `https://github.com/${change.repo}/tree/${change.parent}`;
        window.open(url);
    }

    return (
        <Box sx={{ p: '1%' }}>
            <Box sx={{ py: 2 }}>
                <Typography variant="h5" component="div"  text-align="left">
                    Change {number ? number : "detail"}: {change.subject}
                </Typography>
            </Box>
            {auth.user.group === "gherald" &&
                <GheraldReport change={change} />
            }

            <Box sx={{ pt: 2 }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={2}>{t('change_info_author')}</Grid>
                    <Grid item xs={4}>
                        <Item>
                            <Grid container spacing={2}>
                                <Grid item item xs={10}>{change.author.name}</Grid>
                            </Grid>
                        </Item>

                    </Grid>
                    <Grid item xs={6} />
                    <Grid item xs={2}>{t('change_info_repo')}</Grid>
                    <Grid item xs={4}>
                        <Item>{change.project}</Item>
                    </Grid>
                    <Grid item xs={6} />
                    <Grid item xs={2}>{t('change_info_branch')}</Grid>
                    <Grid item xs={4}>
                        <Item>{change.branch}</Item>
                    </Grid>
                    <Grid item xs={6} />
                    <Grid item xs={2}>{t('change_info_created')}</Grid>
                    <Grid item xs={4}>
                        <Item>{change.updated.substring(0,10)}</Item>
                    </Grid>
                    <Grid item xs={6} />
                    <Grid item xs={6}>
                        <Item>
                            <div>
                                {change.commitMsg.split('\n').map((str, index) => (
                                    <NewlineText key={'line-' + index} text={str} />
                                ))}
                            </div>
                        </Item>
                    </Grid>
                    <Grid item xs={6} />
                </Grid>
            </Box>

            <Box sx={{ width: '100%' }}>
                <Box
                    sx={{
                        width: '100%',
                        display: 'grid',
                        gridAutoFlow: 'column',
                        gap: 1,
                        p: '1%'
                    }}
                >
                    <div onClick={handleOpenWindow} align='right'>
                        <Typography variant="button" xs="auto">
                            {/*parent {change.parent.substring(0,7)}*/}
                            {t('change_info_source_code')}
                        </Typography>
                        <IconButton aria-label="open" size="small">
                            <OpenInNewIcon />
                        </IconButton>
                    </div>

                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" color='secondary'>
                        <Toolbar>
                            <Typography component="div" sx={{ width: '77%', flexShrink: 0, fontWeight: 'Medium' }}>
                                {t('change_info_file')}
                            </Typography>
                            <Typography component="div" sx={{ width: '10%', flexShrink: 0, fontWeight: 'Medium' }}>
                                {t('change_info_additions')}
                            </Typography>
                            <Typography component="div" sx={{ width: '13%', flexShrink: 0, fontWeight: 'Medium' }}>
                                {t('change_info_deletions')}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
                <div>
                    {change.files.map((file, index) => (
                        <FileDiff key={'file-' + index} file={file} userGroup={auth.user.group} />
                    ))}
                </div>
            </Box>
        </Box>
    );
}

export default ChangeInfo;
