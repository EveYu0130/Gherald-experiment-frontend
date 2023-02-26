import React, { useState, useEffect, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {useParams, useLocation, Link, useHistory} from "react-router-dom";
import {
    Box,
    Paper,
    Grid,
    Typography,
    AppBar,
    Toolbar,
    TextField,
    CircularProgress,
    Button,
    IconButton
} from '@mui/material';
import 'react-diff-view/style/index.css';

import {ThemeProvider} from "@mui/material/styles";
import ChangeInfo from "../../Molecules/ChangeInfo";
import theme from '../../../theme';
import LanguageToggleButton from "../../Atoms/LanguageToggleButton";


function ChangeDetail() {
    const { changeId } = useParams();

    const [loading, setLoading] = useState(true);
    const [change, setChange] = useState({});

    const history = useHistory();

    useEffect(() => {
        fetch(`https://gherald-backend.herokuapp.com/api/changes/${changeId}`)
            .then(results => results.json())
            .then(data => {
                setChange(data);
                setLoading(false);
            })
            .catch(reqErr => console.error(reqErr))
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ px: '4%', pt: '2%', pb: '5%' }}>
                {loading ? (
                    <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <CircularProgress size={100} />
                    </Box>
                ) : (
                    <div>
                        <LanguageToggleButton />
                        <ChangeInfo change={change}/>
                    </div>
                )}
            </Box>
        </ThemeProvider>
    );
}

export default ChangeDetail;
