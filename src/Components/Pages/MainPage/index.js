import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {
    Box,
    Paper,
    Grid,
    Typography,
    AppBar,
    Toolbar,
    TextField,
    Divider,
    Container,
    CssBaseline,
    Button,
    Card,
    CardContent,
    CardActions,
    CardMedia, DialogTitle, DialogActions, Dialog, DialogContent, DialogContentText, SvgIcon
} from '@mui/material';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useAuth} from "../../../auth";
import taskA from '../../../images/task-a.jpg';
import taskB from '../../../images/task-b.jpg';
import theme from '../../../theme';
import gheraldScoreTip from "../../../images/gherald-score.png";
import gheraldAuthorTip from "../../../images/gherald-author.png";
import gheraldFileTip from "../../../images/gherald-file.png";
import gheraldMethodTip from "../../../images/gherald-method.png";
import gheraldLineTip from "../../../images/gherald-line.png";
import pauseTip from "../../../images/pause-a.png";
import submitTip from "../../../images/submit.png";
import skipTip from "../../../images/skip.png";
import {ReactComponent as GheraldIcon} from "../../../icons/gherald.svg";
import GheraldTips from "../../Molecules/GheraldTips";

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

function MainPage({practiced, onSubmit, setPractice}) {
    let auth = useAuth();
    const [tip, setTip] = useState(false);
    const [tipShown, setTipShown] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const { innerWidth: width, innerHeight: height } = window;

    let rectY = innerHeight;
    if (document.getElementById('gherald-info')) {
        rectY = document.getElementById('gherald-info').getBoundingClientRect().y;
        if (!practiced && rectY < innerHeight / 3 && !tipShown) {
            setTip(true);
            setTipShown(true);
        }
    }

    useEffect(() => {
        const updatePosition = () => {
            setScrollPosition(window.pageYOffset);
        }
        window.addEventListener("scroll", updatePosition);
        return () => window.removeEventListener("scroll", updatePosition);
        if (!tipShown) {

        }
    }, []);


    const handlePractice = () => {
        setPractice(true);
        onSubmit();
    }

    const handleExperiment = () => {
        setPractice(false);
        onSubmit();
    }

    const handleTipOpen = () => {
        setTip(true);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="false" disableGutters>
                <Background sx={{ width: '100%', backgroundImage: `url(${backgroundImage})`}}/>
                <CssBaseline />
                <Box sx={{ width: '100%' }}>
                    {/*<Header>Welcome to our experiment on code review</Header>*/}
                    <Box sx={{ width: '100%', textAlign: 'center', p: '4%' }}>
                        <Typography variant="h4" component="div" sx={{ fontWeight: '600' }}>
                            Welcome to our experiment on code review
                        </Typography>
                    </Box>
                    <Box sx={{ width: '100%', backgroundColor: '#f5f5f5', px: '20%', py: '4%' }}>
                        <Typography variant="h5" component="div" sx={{ fontWeight: '600' }}>
                            About the experiment
                        </Typography>
                        <Box sx={{ py: '20px' }}>
                            <Typography variant="subtitle1" paragraph>
                                <p>
                                    Thanks for your participation!
                                </p>
                                <p>
                                    In this experiment, we are going to ask you to complete two tasks that relate to code review.
                                    We will be using examples code commits taken from real-world systems and asking you to evaluate them in different ways.
                                </p>
                                <p>
                                    The tasks will be timed.
                                    The timer can be paused if you get a phone call or want to grab a coffee.
                                    However, please do not pause the timer if you are actively working on the task.
                                </p>
                                <p>
                                    We are aware that it may be possible for you to access the actual historic code reviews performed by the systems' original developers.
                                    We respectfully ask you <b>not</b> to do this, so that we can evaluate our research ideas without bias.
                                    However, you are free to use other tools or information sources that you normally use during code reviews.
                                </p>
                                <p>
                                    You will have the opportunity to do a warm-up example for each task; see the <b>Start Practice</b> button below.
                                    These exercises will give you some familiarity with the task workflow, the UI, and the design of the experiment.
                                    The practise exercises will not be timed or evaluated by us.
                                </p>
                                <p>
                                    Once you are comfortable that you understand what you're being asked to do, you can begin the experiment by clicking on the <b>Start Experiment</b> button below.
                                </p>
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ width: '100%', px: '20%', py: '4%' }}>
                        <Typography variant="h5" component="div" sx={{ fontWeight: '600' }}>
                            Your Tasks in a Glance
                        </Typography>

                        <Grid container spacing={4} sx={{ py: '20px' }}>
                            {/*<Grid item xs={6} sx={{ minHeight: 300 }}>*/}
                            {/*    <Card sx={{ height: '100%', display: 'flex' }}>*/}
                            {/*        <CardContent sx={{ flex: 1 }}>*/}
                            {/*            <Typography component="h2" variant="h6">*/}
                            {/*                Task A [x~ minutes to complete]*/}
                            {/*            </Typography>*/}
                            {/*            <Typography variant="subtitle1" color="text.secondary">*/}
                            {/*                Rank the changes by risk*/}
                            {/*            </Typography>*/}
                            {/*            <Typography variant="subtitle1" paragraph>*/}
                            {/*                In this task, you will be provided with three sets of code changes (i.e., proposed commits to an existing software system).*/}
                            {/*                Your job is to rank the changes from most to least risky, where we define risk as "the likelihood of a defect in the code that will need to be fixed later".*/}
                            {/*            </Typography>*/}
                            {/*        </CardContent>*/}
                            {/*    </Card>*/}
                            {/*</Grid>*/}
                            <Grid item xs={6} sx={{ minHeight: 250 }}>
                                <Card sx={{ display: 'flex', height: '100%' }}>
                                    <CardContent sx={{ flex: 1 }}>
                                        <Typography component="h2" variant="h6">
                                            Task A [5~ minutes to complete]
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary">
                                            Rank the changes by risk
                                        </Typography>
                                        <Box
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            sx={{mt: '12px'}}>
                                            <Typography variant="subtitle1" paragraph sx={{ fontSize: "12px", pr: '10px' }}>
                                                In this task, you will be provided with three sets of code changes (i.e., proposed commits to an existing software system).
                                                Your job is to rank the changes from most to least risky, where we define risk as "the likelihood of a functional defect in the code that will need to be fixed later".
                                            </Typography>
                                            <img src={taskA} alt="taskA" width={150} height={150} className={"taskA"} />
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={6} sx={{ minHeight: 250 }}>
                                <Card sx={{ display: 'flex', height: '100%' }}>
                                    <CardContent sx={{ flex: 1 }}>
                                        <Typography component="h2" variant="h6">
                                            Task B [60~ minutes to complete]
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary">
                                            Conduct Code Reviews
                                        </Typography>
                                        <Box
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            sx={{mt: '12px'}}>
                                            <Typography variant="subtitle1" paragraph sx={{ fontSize: "12px", pr: '10px' }}>
                                                In this task, you will be provided with the same three sets of changes that you saw in task A.
                                                Your job will be to identify all of the functional defects in the commit and log them (file name, line number, description of defect) in a report.
                                            </Typography>
                                            <img src={taskB} alt="taskB" width={150} height={150} className={"taskB"} />
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                            {/*<Grid item xs={6} sx={{ minHeight: 300 }}>*/}
                            {/*    <Card sx={{ height: '100%', display: 'flex' }}>*/}
                            {/*        <CardContent sx={{ flex: 1 }}>*/}
                            {/*            <Typography component="h2" variant="h6">*/}
                            {/*                Task B [x~ minutes to complete]*/}
                            {/*            </Typography>*/}
                            {/*            <Typography variant="subtitle1" color="text.secondary">*/}
                            {/*                Conduct Code Reviews*/}
                            {/*            </Typography>*/}
                            {/*            <Typography variant="subtitle1" paragraph>*/}
                            {/*                In this task, you will be provided with the same three sets of changes that you saw in the first task.*/}
                            {/*                Your job will be to identify all of the defects in the commit and log them (file name, line number, description of defect) in a report.*/}
                            {/*            </Typography>*/}
                            {/*        </CardContent>*/}
                            {/*    </Card>*/}
                            {/*</Grid>*/}
                        </Grid>
                    </Box>

                    {/*{auth.user.group != "no-tool" && <Divider />}*/}

                    {auth.user.group === "gherald" &&
                        <Box sx={{ width: '100%', backgroundColor: '#f5f5f5', px: '20%', py: '4%' }}>
                            <Typography variant="h5" component="div" sx={{ fontWeight: '600' }}>
                                Tools
                            </Typography>
                            <Box sx={{ py: '20px' }} id="gherald-info">
                                <Card sx={{ minWidth: 275}}>
                                    <CardContent>
                                        <Typography variant="subtitle1" paragraph>
                                            <p>
                                                In this experiment, you will be provided with a tool called <b>Gherald</b> to assist your completion of tasks.
                                            </p>
                                            <p>
                                                In a nutshell, Gherald is a risk assessment technique we implemented based on historical analysis.
                                                During the tasks, you will be provided with Gherald risk assessment results regarding the riskiness of change and its relevant author, files, and methods.
                                                Specifically, you will be presented with an overall risk assessment in percentage/ratings regarding the author, files, and methods of the change.
                                                Moreover, Gherald will provide you the historical statistics of files and methods and alert you of the risky lines that are prone to defects when you are reviewing the code diff.
                                            </p>
                                            <p>
                                                Please feel free to use Gherald as a complementary tool to help with your manual code reviews.
                                            </p>
                                            <p>
                                                You can learn more details of Gherald by clicking on the <b>Tips for Gherald</b> button.
                                            </p>
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={handleTipOpen}>Tips for Gherald</Button>
                                    </CardActions>
                                </Card>
                            </Box>
                            <GheraldTips tip={tip} setTip={setTip}/>
                        </Box>
                    }

                    {auth.user.group === "infer" &&
                        <Box sx={{ width: '100%', backgroundColor: '#f5f5f5', px: '20%', py: '5%' }}>
                            <Typography variant="h5" component="div" sx={{ fontWeight: '600' }}>
                                Tools
                            </Typography>
                            <Box sx={{ py: '20px' }}>
                                <Card sx={{ minWidth: 275}}>
                                    <CardContent>
                                        <Typography variant="subtitle1" paragraph>
                                            <p>
                                                In this experiment, you will be provided with a tool called <b>Infer</b> to assist your completion of tasks.
                                            </p>
                                            <p>
                                                Infer is a static analysis tool and it can detect bugs in terms of null pointer dereferences, memory leaks, coding conventions and unavailable API’s.
                                            </p>
                                            <p>
                                                During the tasks, you will be able to see the output of Infer in the change detail page.
                                                Specifically, you will be presented with an Infer analysis report specifying the detected issues and the problematic line of code.
                                            </p>
                                            <p>
                                                Please feel free to use Infer as a complementary tool to help with your manual code reviews.
                                            </p>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Box>
                    }

                    {/*<Divider />*/}
                    <Box sx={{ width: '100%', px: '20%', py: '4%' }}>
                        <Typography variant="h5" component="div" sx={{ fontWeight: '600' }}>
                            Practice the Tasks
                        </Typography>
                        <Box sx={{ py: '20px' }}>
                            <Card sx={{ minWidth: 275}}>
                                <CardContent>
                                    <Typography variant="subtitle1" paragraph>
                                        <p>
                                            Before you start the real experiment, you'll be able to do a practice round of each task.
                                            This will give you some experience with the workflow of the task, the UI, and the problem space.
                                            We will not evaluate the results of the practice tasks, so take your time.
                                        </p>
                                        <p>
                                            Click on the <b>Start practice</b> button below to give it a try.
                                            Once you have completed the practice, the <b>Start experiment</b> button will be enabled and you'll be able to go on to the actual experiment.
                                        </p>
                                        <p>
                                            Note that while we are timing your responses, don't think of this as a race.
                                            Take the time you feel that you need to do the task to your satisfaction.
                                        </p>
                                        <p>
                                            Also, if you get a phone call or otherwise need to take a short break for some reason, please click on the <b>Pause</b> button.
                                            However, please do <b>not</b> pause if you're actively thinking about the task.
                                        </p>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    </Box>

                    <Divider />

                    <Box sx={{ width: '100%', textAlign: 'center', px: '20%', py: '2%' }} >
                        <Button  variant="contained" sx={{ mx: '2%', width: '200px' }} onClick={handlePractice}>
                            Start Practice
                        </Button>
                    </Box>
                    <Box sx={{ width: '100%', textAlign: 'center', px: '20%', pb: '5%' }}>
                        <Button  variant="contained" sx={{ mx: '2%', width: '200px' }} onClick={handleExperiment} disabled={!practiced}>
                            Start Experiment
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default MainPage;
