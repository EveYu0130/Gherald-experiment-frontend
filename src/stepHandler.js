import React, {useState} from 'react'
import MainPage from "./Components/Pages/MainPage";
import TaskA from "./Components/Pages/TaskA";
import TaskB from "./Components/Pages/TaskB";
import Questionnaire from "./Components/Pages/Questionnaire";
import EndPage from "./Components/Pages/EndPage";

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
        <CurrentStepComponent
            onSubmit={()=>{
                setCurrentStep((practice && currentStep == 2) ? 0 : currentStep + 1);
            }}
            practice={practice}
            setPractice={setPractice}
            practiced={practiced}
            setPracticed={setPracticed}
        />
    );
}

export default StepHandler;
