import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../Atoms/Button';

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

const LabelWrapper = styled.div`
    display:block;
    margin-bottom: 20px;
`;

const Label = styled.label`
    font: 13px Arial, Helvetica, sans-serif;
	font-weight: bold;
	padding-top: 8px;
	padding-right: 25px;
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

function AddParticipant() {
    const [email, setEmail] = useState('');
    const history = useHistory();

    const handleChange = (e) => setEmail(e.target.value);

    const handleSubmit = (e) => {
        console.log('Participant added');
        e.preventDefault();
        fetch('/api/participants/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "email="+email
        }).then(response => {
            history.push('/participants')
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <Wrapper>
            <Header>Add participant</Header>
            <form>
                <LabelWrapper>
                    <Label>Email:</Label>
                    <input name="email" type="text" value={email} onChange={handleChange} />
                </LabelWrapper>
                <StyledButton type="submit" value="Submit" disabled={!email} onClick={handleSubmit}>
                    <ButtonLabel>Submit</ButtonLabel>
                </StyledButton>
            </form>
            <Link to="/participants">
                <StyledButton>
                    <ButtonLabel>Cancel</ButtonLabel>
                </StyledButton>
            </Link>
        </Wrapper>
    )
}

export default AddParticipant;