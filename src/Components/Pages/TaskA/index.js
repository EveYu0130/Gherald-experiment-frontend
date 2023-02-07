import React, {useEffect, useState} from 'react';
import styled, {css, keyframes} from 'styled-components';
import {BrowserRouter as Router, Link, Route, Switch, useHistory, useRouteMatch, Redirect} from 'react-router-dom';
import {
    Box,
    Paper,
    Grid,
    Typography,
    AppBar,
    Toolbar,
    TextField,
    Divider,
    Button,
    Container,
    CssBaseline, CircularProgress, DialogContent, DialogContentText, DialogTitle, DialogActions, Dialog, SvgIcon
} from '@mui/material';
import ChangeDetail from "../ChangeDetail";
import DnD from "../../Molecules/DnD";
import {useAuth} from "../../../auth";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import theme from '../../../theme';
import learnMoreTip from "../../../images/learn-more.png";
import learnMoreTipZH from "../../../images/learn-more-zh.png";
import submitTip from "../../../images/submit.png";
import skipTip from "../../../images/skip.png";
import pauseTip from '../../../images/pause-a.png';
import submitTipZH from "../../../images/submit-zh.png";
import skipTipZH from "../../../images/skip-zh.png";
import pauseTipZH from '../../../images/pause-a-zh.png';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import GheraldTips from "../../Molecules/GheraldTips";
import gheraldAuthorTip from "../../../images/gherald-author.png";
import {ReactComponent as GheraldIcon} from "../../../icons/gherald.svg";
import TaskTips from "../../Molecules/TaskTips";
import { useTranslation, Trans } from 'react-i18next';

const backgroundImage = 'https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80';

const Background = styled(Box)({
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat',
    zIndex: -1,
    opacity: 0.1,
});


function TaskA({practice, onSubmit}) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [ready, setReady] = useState(false);
    const [taskTip, setTaskTip] = useState(practice);
    const [gheraldTip, setGheraldTip] = useState(false);
    const { t, i18n } = useTranslation();

    let auth = useAuth();

    const tips = [
        (<DialogContent>
            <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
                <Trans i18nKey="tips_task_a_content_p1">
                    You can examine the details of each change by clicking on the <b>Learn more</b> button.
                </Trans>
            </DialogContentText>
            {i18n.language === "en" ?
                <img src={learnMoreTip} alt="learnMoreTip"/> :
                <img src={learnMoreTipZH} alt="learnMoreTipZH"/>
            }
        </DialogContent>),
        (<DialogContent>
            <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
                <Trans i18nKey="tips_task_a_content_p2">
                    You can pause the experiment by clicking on the <b>Pause</b> button if you get a phone call or want to grab a coffee.
                </Trans>
            </DialogContentText>
            {i18n.language === "en" ?
                <img src={pauseTip} alt="pauseTip"/> :
                <img src={pauseTipZH} alt="pauseTipZH"/>
            }
        </DialogContent>),
        (<DialogContent>
            <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
                <Trans i18nKey="tips_task_a_content_p3">
                    Once you are happy with your ranking, click on the <b>Submit</b> button.
                </Trans>
            </DialogContentText>
            {i18n.language === "en" ?
                <img src={submitTip} alt="submitTip"/> :
                <img src={submitTipZH} alt="submitTipZH"/>
            }
        </DialogContent>),
        (<DialogContent>
            <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
                <Trans i18nKey="tips_task_a_content_p4">
                    If you feel unable to make a meaningful evaluation, you can click on the <b>Skip</b> button instead, and we'll advance you to the next one.
                </Trans>
            </DialogContentText>
            {i18n.language === "en" ?
                <img src={skipTip} alt="skipTip"/> :
                <img src={skipTipZH} alt="skipTipZH"/>
            }
        </DialogContent>),
        // (<DialogContent>
        //     <DialogContentText id="alert-dialog-description">
        //         Note: Since the functions are truncated into chunks in code diff and are not completely displayed, some lines may be mistakenly highlighted as comments.
        //         This will be fixed if you expand the code to show the complete function.
        //     </DialogContentText>
        // </DialogContent>)
    ]

    useEffect(() => {
        fetch(`/api/participants/${auth.user.id}`)
            .then(results => results.json())
            .then(data => {
                setLoading(false);
                setData(data);
            })
    }, [])

    const handleReadyClick = () => {
        setReady(true);
    }

    const handleGheraldTipOpen = () => {
        setGheraldTip(true);
    };

    const handleTaskTipOpen = () => {
        setTaskTip(true);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="false" disableGutters>
                <Background sx={{ width: '100%', backgroundImage: `url(${backgroundImage})`}}/>
                <CssBaseline />
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ width: '100%', textAlign: 'center', p: '4%' }}>
                        <Typography variant="h4" component="div" sx={{ fontWeight: '600' }}>
                            {t('task_a_title')}
                        </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ width: '100%', px: '10%', pt: '30px' }}>
                        {auth.user.group === "gherald" ?
                            <Grid container >
                                <Grid item xs={7}>
                                    <Typography variant="h6">
                                        {t('task_description')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button variant="outlined" onClick={handleTaskTipOpen}>
                                        <TipsAndUpdatesIcon sx={{mr: '5px'}}/>
                                        {t('tips_task_a_title')}
                                    </Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button variant="outlined" onClick={handleGheraldTipOpen}>
                                        <SvgIcon component={GheraldIcon} inheritViewBox sx={{mr: '5px'}}/>
                                        {t('tips_gherald_title')}
                                    </Button>
                                </Grid>
                            </Grid> :
                            <Grid container spacing={2}>
                                <Grid item xs={10}>
                                    <Typography variant="h6">
                                        {t('task_description')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button variant="outlined" onClick={handleTaskTipOpen}>
                                        <TipsAndUpdatesIcon sx={{mr: '5px'}}/>
                                        {t('tips_task_a_title')}
                                    </Button>
                                </Grid>
                            </Grid>
                        }

                        {!ready ? (
                            <Typography component="div"  text-align="center">
                                <p>{t('task_a_content_p1')}</p>
                                <p>
                                    <Trans i18nKey="task_a_content_p2">
                                        To perform the ranking, just <b>drag and drop</b> the changes to the order you think is right. (1 = Most risky, 3 = Least risky).
                                    </Trans>
                                </p>
                                <p>
                                    <Trans i18nKey="task_a_content_p3">
                                        To start the task, click on the <b>I'm ready for Task A</b> button below.
                                    </Trans>
                                </p>
                            </Typography>
                        ) : (
                            <Typography component="div"  text-align="center">
                                <p>{t('task_a_content_p4')}</p>
                                <p>
                                    <Trans i18nKey="task_a_content_p2">
                                        To perform the ranking, just <b>drag and drop</b> the changes to the order you think is right. (1 = Most risky, 3 = Least risky).
                                    </Trans>
                                </p>
                            </Typography>
                        )}
                    </Box>

                    {!ready ? (
                        <Box sx={{ width: '100%', textAlign: 'center' }}>
                            <Button  variant="contained" sx={{ mx: '2%', my: '1%', width: '200px' }} onClick={handleReadyClick}>
                                {t('task_a_ready_btn')}
                            </Button>
                        </Box>
                    ) : (
                        <Box sx={{ width: '100%', px: '10%', pt: '20px', pb: '10%' }}>
                            {loading ? (
                                <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <CircularProgress size={100} />
                                </Box>
                            ) : (
                                <DnD data={data} practice={practice} onSubmit={onSubmit}/>
                            )}
                        </Box>
                    )}
                    <TaskTips tips={tips} tip={taskTip} setTip={setTaskTip} task={"A"}/>
                    <GheraldTips tip={gheraldTip} setTip={setGheraldTip}/>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default TaskA;
