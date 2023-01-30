import React from "react";
import { useNavigate } from "react-router-dom";

import styled from 'styled-components'

import image from '../assets/images/welcome.jpg'
import image2 from '../assets/images/welcome2.jpg'
import Button from "../components/Button";


const Container = styled.div`
  min-height: 100vh;
  background: url(/images/Background.jpg) center no-repeat fixed;
  background-size: cover;
`

const Wrapper = styled.div`
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
`

const WelcomeBlock = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 440px;
  height: 740px;
  border-radius: 20px;
  background-color: white;
`

const BigImage = styled.img`
  margin-top: 30px;
  height: 350px;
  width: 350px;
  object-fit: cover;
`

const SmallImage = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
`

const Label = styled.h2`
  margin-top: 19px;
  margin-bottom: 20px;
  font-size: 32px;
  color: #3D3B39;
`

const ButtonWrapper = styled.div`
  margin-top: 12px;
`


const Welcome = () => {
  const navigate = useNavigate()
  return(
    <Container>
      <Wrapper>
        <WelcomeBlock>
          <BigImage src={image}/>
          <SmallImage src={image2}/>
          <Label>Добро пожаловать!</Label>
          <ButtonWrapper>
            <Button text='Регистрация' handler={() => navigate('/register')}/>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button text='Вход' handler={() => navigate('/login')}/>
          </ButtonWrapper>        
        </WelcomeBlock>
      </Wrapper>
    </Container>
  )
};

export default Welcome;
