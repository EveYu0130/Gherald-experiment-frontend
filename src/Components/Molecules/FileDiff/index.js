import React, {useState, useMemo} from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {diffLines, formatLines} from "unidiff";
import {parseDiff} from "react-diff-view";
import DiffView from "../../Pages/DiffView";
import {Alert, AlertTitle, SvgIcon} from "@mui/material";
import { ReactComponent as GheraldIcon } from '../../../icons/gherald.svg';


const FileDiff = ({ file, userGroup }) => {
    const [fileDiff] = parseDiff(file.diff, {nearbySequences: 'zip'})
    // const [fileDiff] = file.diff ? parseDiff(file.diff) : parseDiff(formatLines(diffLines(file.codeA, file.codeB), {context: 3}), {nearbySequences: 'zip'});
    const linesCount = file.codeA ? file.codeA.split('\n').length : 0;
    return (
        <Accordion key={file.filename} TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={file.filename + "-content"}
                id={file.filename + "-header"}
            >
                <Typography sx={{ width: '80%', flexShrink: 0 }}>
                    {file.filename}
                </Typography>
                <Typography sx={{ width: '10%', flexShrink: 0, color: '#188038' }}>
                    {file.status ? "" : "+" + file.insertions}
                </Typography>
                <Typography sx={{ width: '10%', flexShrink: 0, color: '#d93025' }}>
                    {file.status ? "" : "-" + file.deletions}
                </Typography>
            </AccordionSummary>
            {userGroup === "gherald" && file.filename.split(".").pop() === "java" && !file.filename.split("/").includes("test") &&
                <Alert severity="warning" icon={<SvgIcon component={GheraldIcon} inheritViewBox/>}>
                    {/*<AlertTitle>GHERALD file risk: there have been {file.priorBugs} prior bugs among {file.priorChanges} changes in this file</AlertTitle>*/}
                    FILE: there have been {file.priorBugs} prior bugs among {file.priorChanges} changes in this file
                </Alert>
            }
            <AccordionDetails>
                <DiffView hunks={fileDiff.hunks} oldSource={file.codeA} linesCount={linesCount} modifiedLines={file.lines} modifiedMethods={file.methods} userGroup={userGroup} />
            </AccordionDetails>
        </Accordion>
    );
};

export default FileDiff;
