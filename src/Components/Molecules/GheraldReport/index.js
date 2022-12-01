import * as React from 'react';
import {Box, Card, CardContent, Grid, Rating, SvgIcon, Typography} from "@mui/material";
import styled from "styled-components";
import LinearProgress, {linearProgressClasses} from "@mui/material/LinearProgress";
import {makeStyles} from "@mui/styles";
import {createTheme} from "@mui/material/styles";
import {useEffect} from "react";
import InfoIcon from '@mui/icons-material/Info';
import InfoPopover from "../../Atoms/InfoPopover";
import {ReactComponent as GheraldIcon} from "../../../icons/gherald.svg";
import AuthorPopover from "../../Atoms/AuthorPopover";
import WarningIcon from "@mui/icons-material/Warning";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff3d47',
    }
});

function RiskRating(props) {
    const value = props.value;
    return (
        <StyledRating
            name="customized-color"
            value={value}
            precision={0.05}
            readOnly
            icon={<WarningIcon fontSize="inherit" />}
            emptyIcon={<WarningAmberIcon fontSize="inherit" />}
        />
    )
}

function change(value) {
    return gradient(value/100,'#ffab91','#dd2c00');
}

function gradient(t,start,end) {
    return t>=0.5 ? linear(start,end,(t-.5)*2) : linear(start,end,t*2);
}

function linear(s,e,x) {
    let r = byteLinear(s[1]+s[2], e[1]+e[2], x);
    let g = byteLinear(s[3]+s[4], e[3]+e[4], x);
    let b = byteLinear(s[5]+s[6], e[5]+e[6], x);
    return "#" + r + g + b;
}

// a,b are hex values from 00 to FF; x is real number in range 0..1
function byteLinear(a,b,x) {
    let y = (('0x'+a)*(1-x) + ('0x'+b)*x)|0;
    return y.toString(16).padStart(2,'0') // hex output
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
    },
}));

const useStyles = makeStyles({
    root: {
        height: 10,
        borderRadius: 5
    },
    bar: ({ props }) => ({
        borderRadius: 5,
        // background: `linear-gradient(90deg, #ffab91 ${100 - props.value}%, #dd2c00 100%)`
        background: `linear-gradient(90deg, #fbe9e7 ${100 - props.value}%, ${change(props.value)} 100%)`

    })
});

function LinearProgressWithLabel(props) {
    const classes = useStyles({ props });

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <BorderLinearProgress classes={{ root: classes.root, bar: classes.bar }} variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

function ProgressWithLabel({ value, theme }) {
    const [progress, setProgress] = React.useState(0);

    useEffect(() => {
        let interval = null;
        if (progress != value) {
            interval = setInterval(() => {
                if (progress > value) {
                    setProgress((prevProgress) => (value < prevProgress - 1 ? prevProgress - 1 : value));
                } else {
                    setProgress((prevProgress) => (value > prevProgress + 1 ? prevProgress + 1 : value));
                }
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [progress, value])

    return (
        <LinearProgressWithLabel value={progress} theme={theme} />
    );
}

const theme = createTheme();

function GheraldReport({ change }) {
    return (
        <Box sx={{ width: '50%', py: '20px' }}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item>
                            <SvgIcon component={GheraldIcon} inheritViewBox/>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'Medium' }}>
                                RISK ASSESSMENT:
                            </Typography>
                        </Grid>
                    </Grid>
                    {/*<Typography variant="h6" component="div" sx={{ fontWeight: '700', mb: 1.5 }}>*/}
                    {/*    Gherald risk assessment*/}
                    {/*</Typography>*/}
                    {/*<Typography variant="body1" component="div" sx={{ fontWeight: '600', my: 1.5 }}>*/}
                    {/*    Risk score: {change.riskScore}*/}
                    {/*</Typography>*/}
                    {/*<Typography sx={{ mb: 1.5 }} color="text.secondary">*/}
                    {/*    This change is 65% likely to cause defects.*/}
                    {/*</Typography>*/}
                    {/*<Typography variant="body1" component="div" sx={{ fontWeight: '600' }}>*/}
                    {/*    Risk indicators:*/}
                    {/*</Typography>*/}
                    <Grid container spacing={2} sx={{ p: 2}}>
                        <Grid item xs={4}>
                            <Typography variant="body2">Author risk</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <ProgressWithLabel value={change.authorRiskScore * 100} theme={theme}/>
                        </Grid>
                        <Grid item xs={1}>
                            <AuthorPopover author={change.author} change={change} />
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2">File risk</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <ProgressWithLabel value={change.fileRiskScore * 100} theme={theme}/>
                        </Grid>
                        <Grid item xs={1}>
                            <InfoPopover text1={"The file risk score (percentage) indicates the relative likelihood of introducing functional defects in the files of change compared to the other files."}/>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2">Method risk</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <ProgressWithLabel value={change.methodRiskScore * 100} theme={theme}/>
                        </Grid>
                        <Grid item xs={1}>
                            <InfoPopover text1={"The method risk score (percentage) indicates the relative likelihood of introducing functional defects in the methods of change compared to the other methods."}/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
        // <Box sx={{ width: '30%', py: '20px' }}>
        //     <Card sx={{ minWidth: 275 }}>
        //         <CardContent>
        //             <Grid container spacing={2}>
        //                 <Grid item>
        //                     <SvgIcon component={GheraldIcon} inheritViewBox/>
        //                 </Grid>
        //                 <Grid item>
        //                     <Typography variant="subtitle1" sx={{ fontWeight: 'Medium' }}>
        //                         RISK ASSESSMENT:
        //                     </Typography>
        //                 </Grid>
        //             </Grid>
        //             {/*<Typography variant="h6" component="div" sx={{ fontWeight: '700', mb: 1.5 }}>*/}
        //             {/*    Gherald risk assessment*/}
        //             {/*</Typography>*/}
        //             <Typography variant="body1" component="div" sx={{ fontWeight: '600', my: 1.5 }}>
        //                 Risk score: {change.riskScore}
        //             </Typography>
        //             {/*<Typography sx={{ mb: 1.5 }} color="text.secondary">*/}
        //             {/*    This change is 65% likely to cause defects.*/}
        //             {/*</Typography>*/}
        //             <Typography variant="body1" component="div" sx={{ fontWeight: '600' }}>
        //                 Risk indicators:
        //             </Typography>
        //             <Grid container spacing={2} sx={{ p: 2}}>
        //                 <Grid item xs={5}>
        //                     <Typography variant="body2">Author risk</Typography>
        //                 </Grid>
        //                 <Grid item xs={6}>
        //                     <RiskRating value={change.authorRiskScore * 5}/>
        //                 </Grid>
        //                 <Grid item xs={1}>
        //                     <AuthorPopover author={change.author} change={change} />
        //                 </Grid>
        //                 <Grid item xs={5}>
        //                     <Typography variant="body2">File risk</Typography>
        //                 </Grid>
        //                 <Grid item xs={6}>
        //                     <RiskRating value={change.fileRiskScore * 5}/>
        //                 </Grid>
        //                 <Grid item xs={1}>
        //                     <InfoPopover text1={"The risk score is calculated based on the commit activity, defect history, and complexity of the files in change."}/>
        //                 </Grid>
        //                 <Grid item xs={5}>
        //                     <Typography variant="body2">Method risk</Typography>
        //                 </Grid>
        //                 <Grid item xs={6}>
        //                     <RiskRating value={change.methodRiskScore * 5}/>
        //                 </Grid>
        //                 <Grid item xs={1}>
        //                     <InfoPopover text1={"The risk score is calculated based on the commit activity, defect history, and complexity of the methods in change."}/>
        //                 </Grid>
        //             </Grid>
        //         </CardContent>
        //     </Card>
        // </Box>
    );
}

export default GheraldReport;
