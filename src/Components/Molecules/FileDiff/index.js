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
import { Trans } from 'react-i18next';


const FileDiff = ({ file, userGroup, project, changeId }) => {
    const [fileDiff] = file.diff ? parseDiff(file.diff, {nearbySequences: 'zip'}) : parseDiff(formatLines(diffLines(file.codeA, file.codeB), {context: 3}), {nearbySequences: 'zip'});
    const linesCount = file.codeA ? file.codeA.split('\n').length : 0;

    const [expanded, setExpanded] = useState(false);

    const handleChange =
        (panel) => (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <Accordion key={file.filename} TransitionProps={{ unmountOnExit: true }} expanded={expanded === changeId + file.filename} onChange={handleChange(changeId + file.filename)}>
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
            {/*Apache : userGroup === "gherald" && file.filename.split(".").pop() === "java" && !file.filename.split("/").includes("test")*/}
            {userGroup === "gherald" && file.priorChanges > 0 &&
                <Alert severity="warning" icon={<SvgIcon component={GheraldIcon} inheritViewBox/>}>
                    {file.priorChanges > 1 ?
                        <span>
                            <Trans i18nKey="gherald_file_info_prior_change_plural" priorChanges={file.priorChanges}>
                                FILE: This file has been modified in <b>{{priorChanges: file.priorChanges}}</b> prior changes.
                            </Trans>
                            <Trans i18nKey="gherald_file_info_prior_bug" priorBugs={file.priorBugs}>
                                Among these changes, <b>{{priorBugs: file.priorBugs}}</b> bugs have been found in this file.
                            </Trans>
                        </span> :
                        <span>
                            <Trans i18nKey="gherald_file_info_prior_change" >
                                FILE: This file has been modified in <b>1</b> prior change and <b>{{priorBugs: file.priorBugs}}</b> bug has been found.
                            </Trans>
                        </span>
                    }
                    {/*<AlertTitle>GHERALD file risk: there have been {file.priorBugs} prior bugs among {file.priorChanges} changes in this file</AlertTitle>*/}
                    {/*FILE: there have been {file.priorBugs} prior bugs among {file.priorChanges} changes in this file*/}
                </Alert>
            }
            <AccordionDetails>
                <DiffView hunks={fileDiff.hunks} oldSource={file.codeA} linesCount={linesCount} modifiedLines={file.lines} modifiedMethods={file.methods} userGroup={userGroup} project={project}/>
            </AccordionDetails>
        </Accordion>
    );
};

export default FileDiff;
