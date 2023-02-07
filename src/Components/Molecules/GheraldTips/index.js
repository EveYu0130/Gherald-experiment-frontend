import React, {useState} from 'react';

import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, SvgIcon} from "@mui/material";
import {ReactComponent as GheraldIcon} from "../../../icons/gherald.svg";
import gheraldScoreTip from "../../../images/gherald-score.png";
import gheraldAuthorTip from "../../../images/gherald-author.png";
import gheraldFileTip from "../../../images/gherald-file.png";
import gheraldMethodTip from "../../../images/gherald-method.png";
import gheraldLineTip from "../../../images/gherald-line.png";
import { useTranslation, Trans } from 'react-i18next';

const tips = [
    (<DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
            <Trans i18nKey="tips_gherald_content_p1">
                You are provided with a tool called <b>Gherald</b> to assist your completion of tasks. The Gherald risk assessment results are indicated by a <SvgIcon component={GheraldIcon} inheritViewBox/> icon.
                Please find the relevant icon during your completion of tasks.
            </Trans>
        </DialogContentText>
    </DialogContent>),
    (<DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
            <Trans i18nKey="tips_gherald_content_p2">
                Gherald provides an overall risk assessment in percentage regarding the author, files, and methods of the change.
                <p>The risk percentage indicates the relative likelihood of introducing functional defects compared to the other authors/files/methods.</p>
            </Trans>
        </DialogContentText>
        <img src={gheraldScoreTip} alt="gheraldScoreTip"/>
    </DialogContent>),
    (<DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
            <Trans i18nKey="tips_gherald_content_p3">
                Gherald also provides an author-specific risk analysis that assesses the the author's project experience (i.e., how many changes the author has committed), recent activity (i.e., how many changes the author has recently committed), and file expertise (i.e., how many changes the author has committed to the files in change).
                <p>The rating indicates the relative value compared to the other authors. </p>
                This information can be accessed when you <b>hover</b> over the info icon.
            </Trans>
        </DialogContentText>
        <img src={gheraldAuthorTip} alt="gheraldAuthorTip"/>
    </DialogContent>),
    (<DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
            <Trans i18nKey="tips_gherald_content_p4">
                Gherald provides a risk analysis for each file in change based on the historical statistics of changes and defects.
                <p>For each file being modified, an info alert will be displayed.</p>
            </Trans>
        </DialogContentText>
        <img src={gheraldFileTip} alt="gheraldFileTip"/>
    </DialogContent>),
    (<DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
            <Trans i18nKey="tips_gherald_content_p5">
                Gherald provides a risk analysis for each method in change based on the historical statistics of changes and defects.
                <p>For each method being modified, an info alert will be displayed above that method. </p>
            </Trans>
        </DialogContentText>
        <img src={gheraldMethodTip} alt="gheraldMethodTip"/>
    </DialogContent>),
    (<DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
            <Trans i18nKey="tips_gherald_content_p6">
                Gherald provides an line-level risk analysis based on the historical defect statistics of the tokens in each line of change.
                <p>For line containing tokens(function names) that have appeared in more than 10 prior buggy lines, a warning alert will be displayed below that risky line. </p>
                The warning alert indicates the risky tokens as well as their occurrence(in brackets) in prior buggy lines.
            </Trans>
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
    const { t } = useTranslation();

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
                {t('tips_gherald_title')}
            </DialogTitle>
            {tips[currentTip]}
            <DialogActions>
                <Button onClick={handleTipPrevious} disabled={currentTip === 0}>{t('tips_previous_btn')}</Button>
                <Button onClick={handleTipNext} disabled={currentTip === tips.length - 1} autoFocus>{t('tips_next_btn')}</Button>
                <Button onClick={handleTipClose}>{t('tips_close_btn')}</Button>
            </DialogActions>
        </Dialog>
    );
}

export default GheraldTips;
