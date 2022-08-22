import React from 'react';
import {
    Typography,
    Box,
    IconButton,
    AppBar,
    Toolbar,
    SvgIcon,
    Grid
} from '@mui/material';
import AuthorPopover from "../../Atoms/AuthorPopover";
import GheraldReport from "../GheraldReport";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FileDiff from "../FileDiff";

import { ReactComponent as GheraldIcon } from '../../../icons/gherald.svg';
import InfoPopover from "../../Atoms/InfoPopover";
import {useAuth} from "../../../auth";


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

    const handleOpenWindow = (e) => {
        e.preventDefault();
        const url = `https://github.com/${change.repo}/tree/${change.parent}`;
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
                <Grid container spacing={2} sx={{ py: 2 }}>
                    <Grid item>
                        <SvgIcon component={GheraldIcon} inheritViewBox/>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">
                            RISK SCORE: {change.riskScore}
                        </Typography>
                    </Grid>
                </Grid>
            }

            <Box>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={2}>Author</Grid>
                    <Grid item xs={4}>
                        <Item>
                            <Grid container spacing={2}>
                                <Grid item item xs={10}>{change.author.name}</Grid>
                                {auth.user.group === "gherald" &&
                                    <Grid item>
                                        <AuthorPopover author={change.author} authorPriorChanges={change.authorPriorChanges} authorPriorBugs={change.authorPriorBugs} />
                                    </Grid>
                                }
                            </Grid>
                        </Item>

                    </Grid>
                    <Grid item xs={6} />
                    <Grid item xs={2}>Repo</Grid>
                    <Grid item xs={4}>
                        <Item>{change.project}</Item>
                    </Grid>
                    <Grid item xs={6} />
                    <Grid item xs={2}>Branch</Grid>
                    <Grid item xs={4}>
                        <Item>{change.branch}</Item>
                    </Grid>
                    <Grid item xs={6} />
                    <Grid item xs={2}>Created</Grid>
                    <Grid item xs={4}>
                        <Item>{change.updated.substring(0,19)}</Item>
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
                            source code
                        </Typography>
                        <IconButton aria-label="open" size="small">
                            <OpenInNewIcon />
                        </IconButton>
                    </div>

                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" color='secondary'>
                        <Toolbar>
                            <Typography component="div" sx={{ width: '77%', flexShrink: 0 }}>
                                File
                            </Typography>
                            <Typography component="div" sx={{ width: '10%', flexShrink: 0 }}>
                                Additions
                            </Typography>
                            <Typography component="div" sx={{ width: '13%', flexShrink: 0 }}>
                                Deletions
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
