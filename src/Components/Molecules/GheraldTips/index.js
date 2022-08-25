import React, {useState} from 'react';

import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, SvgIcon} from "@mui/material";
import {ReactComponent as GheraldIcon} from "../../../icons/gherald.svg";
import gheraldScoreTip from "../../../images/gherald-score.png";
import gheraldAuthorTip from "../../../images/gherald-author.png";
import gheraldFileTip from "../../../images/gherald-file.png";
import gheraldMethodTip from "../../../images/gherald-method.png";
import gheraldLineTip from "../../../images/gherald-line.png";

const tips = [
    (<DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
            You are provided with a tool called <b>Gherald</b> to assist your completion of tasks. The Gherald risk assessment results are indicated by a&nbsp; <SvgIcon component={GheraldIcon} inheritViewBox/> &nbsp;icon.
            Please find the relevant icon during your completion of tasks.
        </DialogContentText>
    </DialogContent>),
    (<DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
            Gherald estimates an overall risk score based on the historical statistics of changes and defects.
        </DialogContentText>
        <img src={gheraldScoreTip} alt="gheraldScoreTip"/>
    </DialogContent>),
    (<DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
            Gherald provides an analysis of author experience (i.e., the number of prior changes) and estimates a risk score based on the historical statistics of author's prior changes and defects. <br/>
            This information can be accessed when you <b>hover</b> over the icon.
        </DialogContentText>
        <img src={gheraldAuthorTip} alt="gheraldAuthorTip"/>
    </DialogContent>),
    (<DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
            Gherald provides a risk analysis for each file in change based on the historical statistics of changes and defects. <br/>
            For each file being modified, an info alert will be displayed.
        </DialogContentText>
        <img src={gheraldFileTip} alt="gheraldFileTip"/>
    </DialogContent>),
    (<DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
            Gherald provides a risk analysis for each method in change based on the historical statistics of changes and defects. <br/>
            For each method being modified, an info alert will be displayed above that method.
        </DialogContentText>
        <img src={gheraldMethodTip} alt="gheraldMethodTip"/>
    </DialogContent>),
    (<DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
            Gherald provides an risk analysis for each line in change based on the historical defect statistics of the tokens in that line. <br/>
            For line containing tokens that were edited in prior bug fixes, a warning alert will be displayed below that risky line.
        </DialogContentText>
        <img src={gheraldLineTip} alt="gheraldLineTip" />
    </DialogContent>),
    // (<DialogContent>
    //     <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
    //         Please note that since Gherald is
    //     </DialogContentText>
    // </DialogContent>)
]

function GheraldTips({tip, setTip}) {
    const [currentTip, setCurrentTip] = useState(0);

    const handleTipClose = () => {
        setTip(false);
        setCurrentTip(0);
    };

    const handleTipNext = () => {
        setCurrentTip(currentTip + 1);
    };

    const handleTipPrevious = () => {
        setCurrentTip(currentTip - 1);
    };

    return (
        <Dialog
            open={tip}
            onClose={handleTipClose}
            maxWidth="md"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Tips for Gherald
            </DialogTitle>
            {tips[currentTip]}
            <DialogActions>
                <Button onClick={handleTipPrevious} disabled={currentTip === 0}>Previous Tip</Button>
                <Button onClick={handleTipNext} disabled={currentTip === tips.length - 1}>Next Tip</Button>
                <Button onClick={handleTipClose} autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default GheraldTips;
