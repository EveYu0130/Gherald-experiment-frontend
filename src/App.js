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
    clientToken: 'pub7dae0b6c3863c812027015af41ac22bd',
    site: 'datadoghq.com',
    forwardErrorsToLogs: true,
    sessionSampleRate: 100,
})

datadogRum.init({
    applicationId: 'c403d18c-66d7-4a1b-8c42-38cc706496b8',
    clientToken: 'pub7dae0b6c3863c812027015af41ac22bd',
    site: 'datadoghq.com',
    service:'gherald',

    // Specify a version number to identify the deployed version of your application in Datadog
    // version: '1.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
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
