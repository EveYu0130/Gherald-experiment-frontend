import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {
    Box,
    Typography,
    Divider,
    Container,
    CssBaseline,
    Button,
    CircularProgress
} from '@mui/material';
import {useAuth} from "../../../auth";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CodeReview from "../../Molecules/CodeReview";
import {useLocation} from "react-router-dom";
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import theme from '../../../theme';
import OpenInNewIcon from "@mui/icons-material/OpenInNew";


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

    let auth = useAuth();

    useEffect(() => {
        fetch(`/api/participants/${auth.user.id}`)
            .then(results => results.json())
            .then(data => {
                setLoading(false);
                setReviews(practice ? data.changeReviews.slice(0, 3) : data.changeReviews.slice(3, 6));
            })
    }, [])

    const handleReadyClick = () => {
        setReady(true);
    }

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
                        <Typography variant="h6" component="div"  text-align="center">
                            Task Description
                        </Typography>
                        <Typography component="div"  text-align="center">
                            <p>
                                In this task, you will be provided with the same three sets of changes that you saw in task A.
                                Taking each set one at a time, your job will be to identify as many defects in the commit as you can, and then log them (file name, line number, description of defect) in a code inspection form at the bottom of the web page.
                            </p>
                            <p>
                                Please focus on identifying <b>only</b> functional defects; please ignore any other flaws you might notice in the code, such as those relating to style or documentation.
                            </p>
                            <p>
                                For the completeness of comprehension, we provide all types of files (e.g., .xml, testing files) that have been modified in the commit. However, you <b>only</b> need to identify defects in the main functional files (.java files).
                            </p>
                            {!practice &&
                                <p>
                                    You can pause the experiment by clicking on the <b>Pause</b> button if you get a phone call or want to grab a coffee.
                                </p>
                            }
                            {!ready && <p>To start the task, click on the <b>I'm ready for Task B</b> button below.</p>}
                            {ready && <p>The source code can be accessed by clicking on the <b>Source code</b> <OpenInNewIcon /> button below. Feel free to download it if needed.</p>}
                            {ready && <p>Note: Since the functions are truncated into chunks in code diff and are not completely displayed , some lines may be mistakenly highlighted as comments. This will be fixed if you expand the code to show the complete function.</p>}
                        </Typography>
                    </Box>

                    {!ready ? (
                        <Box sx={{ width: '100%', textAlign: 'center' }}>
                            <Button  variant="contained" sx={{ mx: '2%', my: '2%', width: '200px' }} onClick={handleReadyClick}>
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
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default TaskB;
