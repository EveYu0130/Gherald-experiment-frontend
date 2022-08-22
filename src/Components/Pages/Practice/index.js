import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import TaskA from "../TaskA";
import TaskB from "../TaskB";

function Practice() {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/taskA`}><TaskA practice={true} /></Route>
            <Route path={`${path}/taskB`}><TaskB practice={true} /></Route>
        </Switch>
    );
}

export default Practice;