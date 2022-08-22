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

import FileDiff from "../../Molecules/FileDiff";
import AuthorPopover from "../../Atoms/AuthorPopover";
import GheraldReport from "../../Molecules/GheraldReport";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ChangeInfo from "../../Molecules/ChangeInfo";

function ChangeDetail(props) {
    const { changeId } = useParams();

    const [loading, setLoading] = useState(true);
    const [change, setChange] = useState({});

    const history = useHistory();

    useEffect(() => {
        fetch(`/api/changes/${changeId}`)
            .then(results => results.json())
            .then(data => {
                setChange(data);
                setLoading(false);
            })
            .catch(reqErr => console.error(reqErr))
    }, [])

    return (
        <Box sx={{ px: '4%', pt: '2%', pb: '5%' }}>
            {loading ? (
                <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <CircularProgress size={100} />
                </Box>
            ) : (
                <ChangeInfo change={change}/>
            )}
        </Box>
    );
}

export default ChangeDetail;
