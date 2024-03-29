import React, {useState} from 'react';

import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, SvgIcon} from "@mui/material";
import {ReactComponent as GheraldIcon} from "../../../icons/gherald.svg";
import gheraldScoreTip from "../../../images/gherald-score.png";
import gheraldAuthorTip from "../../../images/gherald-author.png";
import gheraldFileTip from "../../../images/gherald-file.png";
import gheraldMethodTip from "../../../images/gherald-method.png";
import gheraldLineTip from "../../../images/gherald-line.png";
import { useTranslation, Trans } from 'react-i18next';

function TaskTips({tips, tip, setTip, task}) {
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
                <Trans i18nKey="tips_task_title">
                    Tips for Task {{task}}
                </Trans>
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

export default TaskTips;
