import React from 'react';
import {Typography, Container, CssBaseline, Avatar, Box, TextField, Button} from '@mui/material';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import styled from "styled-components";
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
    opacity: 0.6,
});

function EndPage() {
    return (
        <ThemeProvider theme={theme}>
            <Container component="main"  maxWidth="false" disableGutters>
                <Background sx={{ width: '100%', backgroundImage: `url(${backgroundImage})`}}/>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <ThumbUpAltIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        This is the end of experiment.
                    </Typography>
                    <Typography component="h1" variant="h5">
                        Thanks for your participation!
                    </Typography>
                </Box>
                {/*<Typography variant="h6" component="div"  text-align="center">*/}
                {/*    This is the end of experiment.*/}
                {/*    Thanks for your participation!*/}
                {/*</Typography>*/}
            </Container>
        </ThemeProvider>
    );
}

export default EndPage;
