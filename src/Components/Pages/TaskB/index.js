import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {
    Box,
    Typography,
    Divider,
    Container,
    CssBaseline,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Grid, SvgIcon
} from '@mui/material';
import {useAuth} from "../../../auth";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CodeReview from "../../Molecules/CodeReview";
import theme from '../../../theme';
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import pauseTip from '../../../images/pause-b.png';
import sourcecodeTip from '../../../images/sourcecode.png';
import noDefectTip from '../../../images/no-defect.png';
import reportDefectTip from '../../../images/report-defect.png';
import pauseTipZH from '../../../images/pause-b-zh.png';
import sourcecodeTipZH from '../../../images/sourcecode-zh.png';
import noDefectTipZH from '../../../images/no-defect-zh.png';
import reportDefectTipZH from '../../../images/report-defect-zh.png';
import filesTip from '../../../images/files.png';
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import {ReactComponent as GheraldIcon} from "../../../icons/gherald.svg";
import TaskTips from "../../Molecules/TaskTips";
import GheraldTips from "../../Molecules/GheraldTips";
import {Link} from "react-router-dom";
import { useTranslation, Trans } from 'react-i18next';
import learnMoreTip from "../../../images/learn-more.png";
import learnMoreTipZH from "../../../images/learn-more-zh.png";


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



function TaskB({practice, onSubmit, setPracticed}) {
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [ready, setReady] = useState(false);
    const [taskTip, setTaskTip] = useState(practice);
    const [gheraldTip, setGheraldTip] = useState(false);
    const { t, i18n } = useTranslation();

    let auth = useAuth();


    let tips = [
        (<DialogContent>
            <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
                <Trans i18nKey="tips_task_b_content_p1">
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
                <Trans i18nKey="tips_task_b_content_p2">
                    The source code can be accessed by clicking on the <b>Source code</b> button below. Feel free to download it if needed.
                </Trans>
            </DialogContentText>
            {i18n.language === "en" ?
                <img src={sourcecodeTip} alt="sourcecodeTip"/> :
                <img src={sourcecodeTipZH} alt="sourcecodeTipZH"/>
            }
        </DialogContent>),
        (<DialogContent>
            <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
                <Trans i18nKey="tips_task_b_content_p3">
                    If no defect is found during the code review, you can click on the <b>No defect to report</b> button to proceed.
                </Trans>
            </DialogContentText>
            {i18n.language === "en" ?
                <img src={noDefectTip} alt="noDefectTip"/> :
                <img src={noDefectTipZH} alt="noDefectTipZH"/>
            }
        </DialogContent>),
        (<DialogContent>
            <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
                <Trans i18nKey="tips_task_b_content_p4">
                    If any defects are found during the code review, you can click on the <b>Report a defect</b> button to open up the code inspection form and log the defect information (file, line, comment).
                    <p>If the defect is general and cannot be targeted to a specific line, feel free to leave it as blank and just put the comment. </p>
                </Trans>
            </DialogContentText>
            {i18n.language === "en" ?
                <img src={reportDefectTip} alt="reportDefectTip"/> :
                <img src={reportDefectTipZH} alt="reportDefectTipZH"/>
            }
        </DialogContent>),
        // (<DialogContent>
        //     <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
        //         Please focus on identifying <b>only</b> functional defects; please ignore any other flaws you might notice in the code, such as those relating to style or documentation.
        //     </DialogContentText>
        // </DialogContent>),
        // (<DialogContent>
        //     <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
        //         Note: Since the functions are truncated into chunks in code diff and are not completely displayed, some lines may be mistakenly highlighted as comments.
        //         This will be corrected if you expand the code to show the complete function.
        //     </DialogContentText>
        //     <img src={highlightTip} alt="highlightTip"/>
        // </DialogContent>)
    ]
    // if (auth.user.project === "apache") {
    //     tips.push(
    //         (<DialogContent>
    //             <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
    //                 For the completeness of comprehension, we provide all types of files (e.g., <b>*.xml</b>, <b>*Test.java</b>) that have been modified in the commit.
    //                 However, you <b>only</b> need to identify defects in the main functional files (<b>*.java</b>).
    //             </DialogContentText>
    //             <img src={filesTip} alt="filesTip"/>
    //         </DialogContent>)
    //     );
    // }

    useEffect(() => {
        fetch(`/api/participants/${auth.user.id}`)
            .then(results => results.json())
            .then(data => {
                let practiceReviews = [];
                let experimentReviews = [];
                const reviewOrder = data.reviewOrder;
                data.changeReviews.forEach(review => {
                    if (review.change.practice) {
                        practiceReviews.push(review)
                    } else {
                        experimentReviews.push(review)
                    }
                })
                if (!practice) {
                    if (reviewOrder === 1) { // high to low risk
                        experimentReviews.sort((a,b) => a.riskLevel - b.riskLevel);
                    } else if (reviewOrder === 2) { // low to high risk
                        experimentReviews.sort((a,b) => b.riskLevel - a.riskLevel);
                    }
                }
                setReviews(practice ? practiceReviews : experimentReviews);
                setLoading(false);
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
                            {t('task_b_title')}
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
                                        {t('tips_task_b_title')}
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
                                        {t('tips_task_b_title')}
                                    </Button>
                                </Grid>
                            </Grid>
                        }
                        <Typography component="div"  text-align="center">
                            <p>{t('task_b_content_p1')}</p>
                            <p>{t('task_b_content_p2')}</p>
                            <p>
                                <Trans i18nKey="task_b_content_p3">
                                    Please focus on identifying <b>only</b> functional defects; please ignore any other flaws you might notice in the code, such as those relating to style or documentation.
                                </Trans>
                            </p>
                            {auth.user.project === "apache" && (
                                <p>
                                    Please focus on identifying defects in the main functional files (*.java) <b>only</b>; you do not need to check the completeness of test cases in the test files (*Test.java), if any.
                                </p>
                            )}
                            {!ready &&
                                <p>
                                    <Trans i18nKey="task_b_content_p4">
                                        To start the task, click on the <b>I'm ready for Task B</b> button below.
                                    </Trans>
                                </p>}
                        </Typography>
                    </Box>

                    {!ready ? (
                        <Box sx={{ width: '100%', textAlign: 'center' }}>
                            <Button  variant="contained" sx={{ mx: '2%', my: '1%', width: '200px' }} onClick={handleReadyClick}>
                                {t('task_b_ready_btn')}
                            </Button>
                        </Box>
                    ) : (
                        <Box sx={{ width: '100%', pt: '20px', pb: '10%' }}>
                            {loading ? (
                                <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <CircularProgress size={100} />
                                </Box>
                            ) : (
                                <CodeReview reviews={reviews} practice={practice} onSubmit={onSubmit} setPracticed={setPracticed} />
                            )}
                        </Box>
                    )}
                    <TaskTips tips={tips} tip={taskTip} setTip={setTaskTip} task={"B"} />
                    <GheraldTips tip={gheraldTip} setTip={setGheraldTip}/>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default TaskB;
