import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Button from "../components/Button";
import ErrorIcon from "../assets/images/ErrorIcon";


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

const CenterBlock = styled.div`
  align-self: center;
  border-radius: 15px;
  width: 527px;
  padding-bottom: 25px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const BigLabel = styled.h2`
  color: #3D3B39;
  font-size: 24px;
  margin-top: 35px;
  margin-bottom: 10px;
`

const InputWrapper = styled.div`
  margin-top: 15px;
`

const SmallLabel = styled.p`
  font-size: 12px;
  color: #565656;
`

const Input = styled.input`
  margin-top: 5px;
  height: 38px;
  width: 369px;
  font-size: 12px;
  padding-left: 20px;
  color: #B3B1B0;
  border: 1px solid #E5E4E3;
  border-radius: 25px;
  outline: none;
  ::-webkit-input-placeholder {color:#B3B1B0;}
  :-ms-input-placeholder      {color:#B3B1B0;}

  &:focus {
    color: #FF7F50;
    border-color: #FF7F50;
    ::-webkit-input-placeholder {color:#FF7F50;}
    :-ms-input-placeholder      {color:#FF7F50;}
  }
`

const PasswordInput = Input

const Star = styled.span`
  color: red;
`

const ErrorMessage = styled.p`
  width: 369px;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  margin-top: 7px;
  font-size: 12px;
  color: #FF4D4F;
`

const ButtonWrapper = styled.div`
  margin-top: 33px;
`


const PasswordReset = () => {

  let [credentials, setCredentials] = useState(
    {
      email: '',
      password: '',
      confirm_password: ''
    }
  )

  let [passwordError, setPasswordError] = useState('')
  let [emailError, setEmailError] = useState('')
  let [confirmPasswordError, setConfirmPasswordError] = useState('')
  let [valid, setValid] = useState(true)
  
  const handleClick = () => {

    setEmailError('')
    setPasswordError('')
    setConfirmPasswordError('')
    setValid(true)

    if (credentials.password == '') {
      setPasswordError('Пароль не может быть пустым')
      setValid(false)
    }
    if (credentials.confirm_password != credentials.password) {
      setConfirmPasswordError('Несовпадение паролей')
      setValid(false)
    }

    if (valid) {
      // запрос на сервер. На сервере происходит валидация почты
    }
  }

  return(
    <Container>
      <Wrapper>
        <CenterBlock>
        <BigLabel>Восстановить пароль</BigLabel>
        <InputWrapper>
          <SmallLabel>Почта<Star>*</Star></SmallLabel>
          <Input placeholder="Введите текст" value={credentials.email}
            onChange={e => setCredentials({...credentials, email: e.target.value})}/>
        </InputWrapper>
        <InputWrapper>
          <SmallLabel>Новый пароль<Star>*</Star></SmallLabel>
          <PasswordInput placeholder="Введите текст" type="password" value={credentials.password}
            onChange={e => setCredentials({...credentials, password: e.target.value})}/>
        </InputWrapper>
        {
          passwordError
        ?
          <ErrorMessage><ErrorIcon/>{ passwordError }</ErrorMessage>
        :
          <></>
        }
        <InputWrapper>
          <SmallLabel>Повторите пароль<Star>*</Star></SmallLabel>
          <PasswordInput placeholder="Введите текст" type="password" value={credentials.confirm_password}
            onChange={e => setCredentials({...credentials, confirm_password: e.target.value})}/>
        </InputWrapper>
        {
          confirmPasswordError
        ?
          <ErrorMessage><ErrorIcon/>{ confirmPasswordError }</ErrorMessage>
        :
          <></>
        }
        <ButtonWrapper>
          <Button width="369px" height="46px" text="Отправить письмо" handler={handleClick}/>
        </ButtonWrapper>
        </CenterBlock>
      </Wrapper>
    </Container>
  )
};

export default PasswordReset;
