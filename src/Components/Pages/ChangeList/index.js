import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Table from '../../Molecules/Table';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";
import ChangeDetail from "../ChangeDetail";


const Wrapper = styled.div`
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    border-radius: 8px;
    background: #f4f7f8;
    text-align: center;
    padding: 5% 0;
    height: 100%;
`;

const Header = styled.h1`
    // background: #43D1AF;
    padding: 20px 0;
    font-weight: 300 bold;
    text-align: center;
    color: #43D1AF;
    margin: -16px -16px 16px -16px;
    // width: 20%;
`;

const Text = styled.h3`
    // background: #43D1AF;
    padding: 20px 0;
    font-weight: 300;
    text-align: center;
    margin: -16px -16px 16px -16px;
    // width: 20%;
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const spinAnimation = css`
  ${spin} 1s infinite linear
`;

const Spinner = styled.div`
  pointer-events: all;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  border: 5px solid
    rgba(255, 255, 255, 0.2);
  border-top-color: #43D1AF;
  border-right-color: #43D1AF;
  animation: ${spinAnimation};
  transition: border-top-color 0.5s linear, border-right-color 0.5s linear;
  margin-left: 48%;
`;

function ChangeList() {
    const [loading, setLoading] = useState(true);
    const [changes, setChanges] = useState([]);

    useEffect(() => {
        fetch('/api/changes')
            .then(results => results.json())
            .then(data => {
                setLoading(false);
                setChanges(data);
            })
    }, [])

    const { path, url } = useRouteMatch();

    const columns = [
        {
            Header: 'Subject',
            accessor: 'subject'
        },
        {
            Header: 'Project',
            accessor: 'project'
        },
        {
            Header: 'Branch',
            accessor: 'branch'
        },
        {
            Header: 'Status',
            accessor: 'status'
        },
        {
            Header: 'Updated',
            accessor: 'updated'
        }
    ]

    let data = []
    changes.forEach(change => {
        data.push({
            subject: <Link to={`${url}/${change.id}`}>{change.subject}</Link>,
            project: change.project,
            branch: change.branch,
            status: change.status,
            updated: change.updated
        })
    })

    return (
        <Router>
            <Switch>
                <Route exact path={path}>
                    <Wrapper>
                        <Header>Changes</Header>
                        <div>
                            {loading ? (
                                <Spinner/>
                            ) : (
                                <Table columns={columns} data={data} />
                            )}
                        </div>
                    </Wrapper>
                </Route>
                <Route path={`${path}/:changeId`} component={ChangeDetail} />
            </Switch>
        </Router>
    );
}

export default ChangeList;
