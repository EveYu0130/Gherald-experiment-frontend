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
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.init({
    clientToken: 'pub4c7353fef78e5352305fd18e7c6d23b3',
    site: 'datadoghq.com',
    forwardErrorsToLogs: true,
    sessionSampleRate: 100,
})

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
