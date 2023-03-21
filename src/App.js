import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PrivateRoute from "./privateRoute";
import MainPage from "./Components/Pages/MainPage";
import Login from "./Components/Pages/Login";
import ParticipantList from "./Components/Pages/ParticipantList";
import TaskA from "./Components/Pages/TaskA";
import TaskB from "./Components/Pages/TaskB";
import Questionnaire from "./Components/Pages/Questionnaire";
import React from "react";
import {ProvideAuth} from "./auth";
import EndPage from "./Components/Pages/EndPage";
import ChangeDetail from "./Components/Pages/ChangeDetail";
import Practice from "./Components/Pages/Practice";
import StepHandler from "./stepHandler";
import { datadogLogs } from '@datadog/browser-logs';
import { datadogRum } from '@datadog/browser-rum';

datadogLogs.init({
    clientToken: 'pubf4c48f798b09902ea5073413e425147a',
    site: 'us5.datadoghq.com',
    forwardErrorsToLogs: true,
    sessionSampleRate: 100,
})

datadogRum.init({
    applicationId: '9e810cbc-fc19-4a3e-922d-b0651acc76fc',
    clientToken: 'pubf4c48f798b09902ea5073413e425147a',
    site: 'us5.datadoghq.com',
    service:'gherald',

    // Specify a version number to identify the deployed version of your application in Datadog
    // version: '1.0.0',
    sessionSampleRate: 100,
    premiumSampleRate: 100,
    trackUserInteractions: true,
    defaultPrivacyLevel:'mask-user-input'
});

datadogRum.startSessionReplayRecording();

function App() {
  return (
      <ProvideAuth>
          <BrowserRouter basename='/gherald'>
              <Switch>
                  <PrivateRoute exact path="/" component={StepHandler} />
                  <Route exact path="/login" component={Login} />
                  <PrivateRoute path="/changes/:changeId" component={ChangeDetail}>
                  </PrivateRoute>
              </Switch>
          </BrowserRouter>
      </ProvideAuth>
  );
}

export default App;
