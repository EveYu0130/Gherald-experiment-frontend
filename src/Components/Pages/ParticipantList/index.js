import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Table from '../../Molecules/Table';
import Button from '../../Atoms/Button';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";
import AddParticipant from "../AddParticipant";


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

const StyledButton = styled(Button)`
  color: #fff;
  flex-shrink: 0;
  padding: 8px 16px;
  justify-content: center;
  margin-bottom: 10px;
  width: 200px;
  margin: 2% 1%;

  @media (max-width: 375px) {
    height: 52px;
  }

  &:disabled {
    opacity: 0.65; 
    cursor: not-allowed;
  }
`;

const ButtonLabel = styled.label`
  margin-left: 5px;
`;

function ParticipantList() {
    const [loading, setLoading] = useState(true);
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        fetch('/api/participants')
            .then(results => results.json())
            .then(data => {
                setLoading(false);
                setParticipants(data);
            })
    })


    const columns = [
        {
            Header: 'Id',
            accessor: 'id'
        },
        {
            Header: 'Email',
            accessor: 'email'
        }
    ]

    const { path, url } = useRouteMatch();

    return (
        <Router>
            <Switch>
                <Route exact path={path}>
                    <Wrapper>
                        <Header>Participants</Header>
                        <Text>Here is the list of participants you have added.</Text>
                        <div>
                            {loading ? (
                                <Spinner/>
                            ) : (
                                <Table columns={columns} data={participants} />
                            )}
                        </div>
                        <Link to={`${url}/add`}>
                            <StyledButton>
                                <ButtonLabel>Add a Participant</ButtonLabel>
                            </StyledButton>
                        </Link>
                    </Wrapper>
                </Route>
                <Route path={`${path}/add`} component={AddParticipant} />
            </Switch>
        </Router>
    );
}

export default ParticipantList;
