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
    CssBaseline, CircularProgress
} from '@mui/material';
import ChangeDetail from "../ChangeDetail";
import DnD from "../../Molecules/DnD";
import {useAuth} from "../../../auth";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import theme from '../../../theme';

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

function TaskA(props) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [ready, setReady] = useState(false);

    let auth = useAuth();

    useEffect(() => {
        fetch(`https://gherald-backend.herokuapp.com/api/participants/${auth.user.id}`)
            .then(results => results.json())
            .then(data => {
                setLoading(false);
                setData(data);
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
                            Task A: Rank the Changes
                        </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ width: '100%', px: '10%', pt: '30px' }}>
                        <Typography variant="h6" component="div"  text-align="center">
                            Task Description
                        </Typography>
                        {!ready ? (
                            <Typography component="div"  text-align="center">
                                <p>
                                    You will be provided with three sets of code changes to an existing software system (i.e., proposed commits).
                                    Your job is to rank the changes from most to least risky, where we defined risk as "likelihood of a defect in the code that will need to be fixed later".
                                </p>
                                <p>
                                    To perform the ranking, just drag and drop the changes to the order you think is right, with the most risky change at the top.
                                </p>
                                <p>
                                    To start the task, click on the <b>I'm ready for Task A</b> button below.
                                </p>
                            </Typography>
                        ) : (
                            <Typography component="div"  text-align="center">
                                <p>
                                    Below are three sets of code changes to an existing software systems (i.e., proposed commits).
                                    Your task is to rearrange the ranking below by the amount of risk you perceive in the changes.  (1 = Most risky, 3 = Least risky).
                                </p>
                                <p>
                                    You can examine the details of each change by clicking on the <b>Learn more</b> button.
                                </p>
                                {!props.practice &&
                                    <p>
                                        You can pause the experiment by clicking on the <b>Pause</b> button if you get a phone call or want to grab a coffee.
                                    </p>
                                }
                                <p>
                                    Once you are happy with your ranking, click on the <b>Submit</b> button.
                                </p>
                                <p>
                                    If you feel unable to make a meaningful evaluation, you can click on the <b>Skip</b> button instead, and we'll advance you to the next one.
                                </p>
                            </Typography>
                        )}
                    </Box>

                    {!ready ? (
                        <Box sx={{ width: '100%', textAlign: 'center' }}>
                            <Button  variant="contained" sx={{ mx: '2%', my: '2%', width: '200px' }} onClick={handleReadyClick}>
                                I'm ready for Task A
                            </Button>
                        </Box>
                    ) : (
                        <Box sx={{ width: '100%', px: '10%', pt: '20px', pb: '10%' }}>
                            {loading ? (
                                <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <CircularProgress size={100} />
                                </Box>
                            ) : (
                                <DnD data={data} practice={props.practice ? true : false}/>
                            )}
                        </Box>
                    )}
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default TaskA;
