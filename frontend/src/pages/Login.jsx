import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import image from '../assets/images/login.jpg'
import image2 from '../assets/images/login2.jpg'
import ErrorIcon from "../assets/images/ErrorIcon";

import Button from "../components/Button";
import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";
import AuthContext from "../context/AuthContext";


const Container = styled.div`
  min-height: 100vh;
  background: url(https://img.freepik.com/free-vector/white-abstract-background_23-2148810113.jpg?w=996&t=st=1675230059~exp=1675230659~hmac=8129915906b8d3bfc283e264c5b5096c651f5c4eeb8644ba86ed8c463fb5885d) center no-repeat fixed;
  background-size: cover;
`

const Wrapper = styled.div`
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
`

const LoginBlock = styled.div`
  align-self: center;
  background-color: white;
  border-radius: 20px;
  width: 886px;
  height: 654px;
  display: grid;
  grid-template-columns: 410px 1fr;
`

const Left = styled.div`
  height: 654px;
  display: flex;
  align-items: center;
`

const LeftImage = styled.img`
  margin-left: 20px;
  width: 371px;
  height: 371px;
  object-fit: cover;
`

const Right = styled.div`
  height: 654px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RightImage = styled.img`
  margin-top: 60px;
  width: 80px;
  height: 80px;
  object-fit: cover;
`

const BigLabel = styled.h2`
  margin-top: 16px;
  font-size: 32px;
  font-weight: 400;
`

const SmallLabel = styled.p`
  margin-top: 20px;
  font-size: 16px;
`

const Separator = styled.div`
  margin-top: 25px;
  margin-bottom: 10px;
  width: 200px;
  height: 1px;
  background-color: #A3A3A3;
`

const InputWrapper = styled.div`
  margin-top: 12px;
`

const Memorization = styled.div`
  width: 313px;
  margin-top: 26px;
  display: flex;
  justify-content: space-between;
`

const Link = styled.a`
  font-size: 12px;
  text-decoration: underline;
  color: #BABAB8;
`

const CheckboxContainer = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
`

const Checkbox = styled.input`
  border: none;
  width: 14px;
  height: 14px;
  accent-color: #FF7F50;
`

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 324px;
  margin-bottom: -35px;
`

const ErrorMessage = styled.p`
  width: 324px;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  margin-top: 25px;
  font-size: 12px;
  color: #FF4D4F;
`

const ErrorLink = styled.div`
  margin-top: 22px;
  font-size: 12px;
  text-decoration: underline;
  color: #BABAB8;
`

const RegisterLabel = styled.p`
  margin-top: 48px;
  font-size: 12px;
  text-align: center;
`

const RegisterLink = styled.a`
  color: #FF7F50;
  cursor: pointer;
`

const ButtonWrapper = styled.div`
  margin-top: 12px;
`


const Login = () => {
  let { loginUser } = useContext(AuthContext)
  let [credentials, setCredentials] = useState(
    {email: '', password: ''}
  )
  let [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    setCredentials({...credentials, email: e.target.value })
  }

  const handlePasswordChange = (e) => {
    setCredentials({ ...credentials, password: e.target.value })
  }

  const handleClick = () => {
    loginUser(credentials)
      .then(result => {
        if (result === 200){
          setError(false)
          navigate('/personal-account')
        }
        else {
          setError(true)
          navigate('/login')
        }
      })
  }

  return(
    <Container>
      <Wrapper>
        <LoginBlock>
          <Left>
            <LeftImage src={image}/>
          </Left>
          <Right>
            <RightImage src={image2}/>
            <BigLabel>С возвращением!</BigLabel>
            <SmallLabel>Войти в личный кабинет</SmallLabel>
            <Separator/>
            <InputWrapper>
              <Input placeholder='Почта' onChange={(e) => handleEmailChange(e)}/>
            </InputWrapper>
            <InputWrapper>
              <PasswordInput onChange={(e) => handlePasswordChange(e)}/>
            </InputWrapper>

            {
            !error
            ?
              <Memorization>
                <Link>Не помню пароль</Link>
                <CheckboxContainer>
                  <Checkbox type="checkbox"/>
                  Запомнить пароль
                </CheckboxContainer>
              </Memorization>
            :
              <ErrorContainer>
                <ErrorMessage><ErrorIcon/> Неверный Логин или Пароль</ErrorMessage>
                <ErrorLink>Не помню пароль</ErrorLink>
              </ErrorContainer>
            }

            <RegisterLabel>
              Впервые на сайте? Пора {' '}
              <RegisterLink href="/register">
                создавать свой аккаунт
              </RegisterLink>
            </RegisterLabel>
            <ButtonWrapper>
              <Button text='Войти' width='324px' handler={handleClick}/>
            </ButtonWrapper>
          </Right>
        </LoginBlock>
      </Wrapper>
    </Container>
  )
};

export default Login;
