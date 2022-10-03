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
import filesTip from '../../../images/files.png';
import sourcecodeTip from '../../../images/sourcecode.png';
import noDefectTip from '../../../images/no-defect.png';
import reportDefectTip from '../../../images/report-defect.png';
import highlightTip from '../../../images/highlight.png';
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import {ReactComponent as GheraldIcon} from "../../../icons/gherald.svg";
import TaskTips from "../../Molecules/TaskTips";
import GheraldTips from "../../Molecules/GheraldTips";
import {Link} from "react-router-dom";


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

const tips = [
    (<DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
            You can pause the experiment by clicking on the <b>Pause</b> button if you get a phone call or want to grab a coffee.
        </DialogContentText>
        <img src={pauseTip} alt="pauseTip"/>
    </DialogContent>),
    (<DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
            For the completeness of comprehension, we provide all types of files (e.g., <b>*.xml</b>, <b>*Test.java</b>) that have been modified in the commit.
            However, you <b>only</b> need to identify defects in the main functional files (<b>*.java</b>).
        </DialogContentText>
        <img src={filesTip} alt="filesTip"/>
    </DialogContent>),
    (<DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
            The source code can be accessed by clicking on the <b>Source code</b> <OpenInNewIcon /> button below. Feel free to download it if needed.
        </DialogContentText>
        <img src={sourcecodeTip} alt="sourcecodeTip"/>
    </DialogContent>),
    (<DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
            If no defect is found during the code review, you can click on the <b>No defect to report</b> button to proceed.
        </DialogContentText>
        <img src={noDefectTip} alt="noDefectTip"/>
    </DialogContent>),
    (<DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
            If any defects are found during the code review, you can click on the <b>Report a defect</b> button to open up the code inspection form and log the defect information (file, line, comment).
            <br/>
            If the defect is general and cannot be targeted to a specific line, feel free to leave it as blank and just put the comment.
        </DialogContentText>
        <img src={reportDefectTip} alt="reportDefectTip"/>
    </DialogContent>),
    (<DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
            Please focus on identifying <b>only</b> functional defects; please ignore any other flaws you might notice in the code, such as those relating to style or documentation.
        </DialogContentText>
    </DialogContent>),
    (<DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
            Note: Since the functions are truncated into chunks in code diff and are not completely displayed, some lines may be mistakenly highlighted as comments.
            This will be corrected if you expand the code to show the complete function.
        </DialogContentText>
        <img src={highlightTip} alt="highlightTip"/>
    </DialogContent>)
]

function TaskB({practice, onSubmit, setPracticed}) {
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [ready, setReady] = useState(false);
    const [taskTip, setTaskTip] = useState(practice);
    const [gheraldTip, setGheraldTip] = useState(false);

    let auth = useAuth();

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
                setLoading(false);
                setReviews(practice ? practiceReviews : experimentReviews);
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
                            Task B: Conduct Code Reviews
                        </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ width: '100%', px: '10%', pt: '30px' }}>
                        {auth.user.group === "gherald" ?
                            <Grid container >
                                <Grid item xs={8}>
                                    <Typography variant="h6">
                                        Task Description
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button variant="outlined" onClick={handleTaskTipOpen}>
                                        <TipsAndUpdatesIcon sx={{mr: '5px'}}/>
                                        Tips for Task B
                                    </Button>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button variant="outlined" onClick={handleGheraldTipOpen}>
                                        <SvgIcon component={GheraldIcon} inheritViewBox sx={{mr: '5px'}}/>
                                        Tips for Gherald
                                    </Button>
                                </Grid>
                            </Grid> :
                            <Grid container spacing={2}>
                                <Grid item xs={10}>
                                    <Typography variant="h6">
                                        Task Description
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button variant="outlined" onClick={handleTaskTipOpen}>
                                        <TipsAndUpdatesIcon sx={{mr: '5px'}}/>
                                        Tips for Task B
                                    </Button>
                                </Grid>
                            </Grid>
                        }
                        <Typography component="div"  text-align="center">
                            <p>
                                In this task, you will be provided with the same three sets of changes that you saw in task A.
                            <p>
                                Taking each set one at a time, your job will be to identify as many defects in the commit as you can,
                                and then log them in a code inspection form.
                            </p>
                            </p>
                            {!ready && <p>To start the task, click on the <b>I'm ready for Task B</b> button below.</p>}
                        </Typography>
                    </Box>

                    {!ready ? (
                        <Box sx={{ width: '100%', textAlign: 'center' }}>
                            <Button  variant="contained" sx={{ mx: '2%', my: '1%', width: '200px' }} onClick={handleReadyClick}>
                                I'm ready for Task B
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
