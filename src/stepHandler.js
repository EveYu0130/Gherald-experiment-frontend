import React, {useState, useEffect} from 'react'
import MainPage from "./Components/Pages/MainPage";
import TaskA from "./Components/Pages/TaskA";
import TaskB from "./Components/Pages/TaskB";
import Questionnaire from "./Components/Pages/Questionnaire";
import EndPage from "./Components/Pages/EndPage";
import LanguageToggleButton from "./Components/Atoms/LanguageToggleButton";
import {
    Button,
    Dialog,
    DialogActions, DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import {Trans, useTranslation} from "react-i18next";

const PracticeTimer = () => {
    const [seconds, setSeconds] = useState(0);
    const [alert, setAlert] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        if (seconds < 300) {
            const interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);

            return () => clearInterval(interval);
        } else {
            setAlert(true);
        }
    }, [seconds]);

    const handleAlertClose = () => {
        setAlert(false);
    };

    return (
        <Dialog
            open={alert}
            onClose={handleAlertClose}
            maxWidth="md"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                You have spent 5 minutes on the practice tasks.
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" sx={{py: 2}}>
                    {t('tips_practice_time_out')}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAlertClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

function StepHandler() {
    const steps = [
        MainPage,
        TaskA,
        TaskB,
        Questionnaire,
        EndPage,
    ]
    const [currentStep, setCurrentStep] = useState(0);
    const [practice, setPractice] = useState(false);
    const [practiced, setPracticed] = useState(false);
    const CurrentStepComponent = steps[currentStep];
    return (
        <div>
            <LanguageToggleButton />
            {practice && !practiced && <PracticeTimer />}
            <CurrentStepComponent
                onSubmit={()=>{
                    setCurrentStep((practice && currentStep == 2) ? 0 : currentStep + 1);
                }}
                practice={practice}
                setPractice={setPractice}
                practiced={practiced}
                setPracticed={setPracticed}
            />
        </div>
    );
}

export default StepHandler;
