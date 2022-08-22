import React, {useState} from 'react';
import styled from 'styled-components';

import { Box, Paper, Grid, Typography, AppBar, Toolbar, TextField, Divider, Container, Avatar, Button, CssBaseline, FormControlLabel, Checkbox, Link, Radio, RadioGroup, FormControl, FormLabel } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useAuth} from "../../../auth";
import {useHistory} from "react-router-dom";
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

function Questionnaire() {
    const [state, setState] = useState({
        understandability: null,
        difficulty: null,
        fitness: null,
        usability: null,
        otherTool: null,
        problem: null,
        feedback: null,
        allowInterview: false
    });
    let auth = useAuth();
    const history = useHistory();

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleCheckChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.checked,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('https://gherald-backend.herokuapp.com/api/questionnaire', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...state, participantId: auth.user.id})
        }).then(response => {
            if  (response.status === 200) {
                history.push(`/end`);
                console.log(history);
            }
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="false" disableGutters>
                <Background sx={{ width: '100%', backgroundImage: `url(${backgroundImage})`}}/>
                <CssBaseline />
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ width: '100%', textAlign: 'center', p: '4%' }}>
                        <Typography variant="h4" component="div" sx={{ fontWeight: '600' }}>
                            Post-Experiment Questionnaire
                        </Typography>
                    </Box>
                    <Divider />
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%', px: '10%', pt: '40px', pb: '10%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography>
                                    1. How well do you think you understood the provided source code changes?
                                </Typography>
                                <RadioGroup
                                    row
                                    name="understandability"
                                    value={state.understandability}
                                    onChange={handleChange}
                                    sx={{ justifyContent: 'space-evenly' }}
                                >
                                    <Box sx={{ width: 200, height: 30}}>
                                        <FormControlLabel value="Very well" control={<Radio />} label="Very well" />
                                    </Box>
                                    <Box sx={{ width: 200, height: 30}}>
                                        <FormControlLabel value="Somewhat" control={<Radio />} label="Somewhat" />
                                    </Box>
                                    <Box sx={{ width: 200, height: 30}}>
                                        <FormControlLabel value="Barely" control={<Radio />} label="Barely" />
                                    </Box>
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    2. How difficult did you find the assigned tasks?
                                </Typography>
                                <RadioGroup
                                    row
                                    name="difficulty"
                                    value={state.difficulty}
                                    onChange={handleChange}
                                    sx={{ justifyContent: 'space-evenly' }}
                                >
                                    <Box sx={{ width: 200, height: 30}}>
                                        <FormControlLabel value="Easy" control={<Radio />} label="Easy" />
                                    </Box>
                                    <Box sx={{ width: 200, height: 30}}>
                                        <FormControlLabel value="Moderate" control={<Radio />} label="Moderate" />
                                    </Box>
                                    <Box sx={{ width: 200, height: 30}}>
                                        <FormControlLabel value="Very hard" control={<Radio />} label="Very hard" />
                                    </Box>
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    3. How would you describe your enthusiasm and energy level during the experiment?
                                </Typography>
                                <RadioGroup
                                    row
                                    name="fitness"
                                    value={state.fitness}
                                    onChange={handleChange}
                                    sx={{ justifyContent: 'space-evenly' }}
                                >
                                    <Box sx={{ width: 200, height: 30}}>
                                        <FormControlLabel value="High" control={<Radio />} label="High" />
                                    </Box>
                                    <Box sx={{ width: 200, height: 30}}>
                                        <FormControlLabel value="Moderate" control={<Radio />} label="Moderate" />
                                    </Box>
                                    <Box sx={{ width: 200, height: 30}}>
                                        <FormControlLabel value="Low" control={<Radio />} label="Low" />
                                    </Box>
                                </RadioGroup>
                            </Grid>
                            {auth.user.group === "gherald" &&
                                <Grid item xs={12}>
                                    <Typography>
                                        4. How useful did you find the information provided by the tool?
                                    </Typography>
                                    <RadioGroup
                                        row
                                        name="usability"
                                        value={state.usability}
                                        onChange={handleChange}
                                        sx={{ justifyContent: 'space-evenly' }}
                                    >
                                        <Box sx={{ width: 200, height: 30}}>
                                            <FormControlLabel value="Very useful" control={<Radio />} label="Very useful" />
                                        </Box>
                                        <Box sx={{ width: 200, height: 30}}>
                                            <FormControlLabel value="Moderately useful" control={<Radio />} label="Moderately useful" />
                                        </Box>
                                        <Box sx={{ width: 200, height: 30}}>
                                            <FormControlLabel value="Not useful" control={<Radio />} label="Not useful" />
                                        </Box>
                                    </RadioGroup>
                                </Grid>
                            }
                            <Grid item xs={12}>
                                <Typography>
                                    {auth.user.group === "gherald" ? 5 : 4}. What, if any, additional tools or information sources did you use during the experiment to help in your decision making?
                                </Typography>
                                <TextField
                                    required
                                    fullWidth
                                    variant="standard"
                                    id="other-tool"
                                    name="otherTool"
                                    multiline
                                    value={state.otherTool || ""}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    {auth.user.group === "gherald" ? 6 : 5}. What, if any, problems did you encounter during the experiment?
                                </Typography>
                                <TextField
                                    required
                                    fullWidth
                                    variant="standard"
                                    id="problem"
                                    name="problem"
                                    multiline
                                    value={state.problem || ""}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    {auth.user.group === "gherald" ? 7 : 6}. Do you have any additional comments or feedback on the tasks you performed and the information you were provided with?
                                </Typography>
                                <TextField
                                    required
                                    fullWidth
                                    variant="standard"
                                    id="feedback"
                                    name="feedback"
                                    multiline
                                    value={state.feedback || ""}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox name="allowInterview" color="primary" checked={state.allowInterview} onChange={handleCheckChange} />
                                    }
                                    label="I am happy to be contacted by the research team for a follow-up interview."
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{ width: '100%', textAlign: 'center' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mx: '2%', my: '3%', width: '200px' }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Questionnaire;
