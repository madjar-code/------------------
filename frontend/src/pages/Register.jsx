import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'

import image from '../assets/images/register.jpg'
import image2 from '../assets/images/register2.jpg'
import ErrorIcon from "../assets/images/ErrorIcon";

import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button";
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

const RegisterBlock = styled.div`
  align-self: center;
  background-color: white;
  border-radius: 20px;
  width: 886px;
  height: 726px;
  display: grid;
  grid-template-columns: 410px 1fr;
`

const Left = styled.div`
  margin-left: 60px;
  height: 726px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const LeftImage = styled.img`
  width: 370px;
  height: 370px;
  object-fit: cover;
`

const BigLabel = styled.h2`
  margin-top: -5px;
  font-size: 32px;
  font-weight: 400;
  color: #3D3B39;
`

const Separator = styled.div`
  margin-top: 17px;
  width: 200px;
  height: 1px;
  background-color: #A3A3A3;
`

const Right = styled.div`
  height: 726px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const RightImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
`

const InputWrapper = styled.div`
  margin-top: 15px;
`

const ErrorMessage = styled.p`
  width: 324px;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  margin-top: 10px;
  font-size: 12px;
  color: #FF4D4F;
`

const CheckboxContainer = styled.div`
  margin-top: 17px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
`

const CheckboxWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
`

const Checkbox = styled.input`
  border: none;
  width: 14px;
  height: 14px;
  accent-color: #FF7F50;
`

const CheckboxLink = styled.a`
  color: #FF7F50;
  margin-left: 3px;
`

const ButtonWrapper = styled.div`
  width: 324px;
  margin-top: 25px;
`

const Register = () => {
  let { signupUser } = useContext(AuthContext)
  let [credentials, setCredentials] = useState(
    {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      confirm_password: ''
    }
  )

  let [passwordError, setPasswordError] = useState('')
  let [emailError, setEmailError] = useState('')
  let [confirmPasswordError, setConfirmPasswordError] = useState('')
  let [valid, setValid] = useState(true)

  const navigate = useNavigate()

  const handleClick = () => {

    setEmailError('')
    setPasswordError('')
    setConfirmPasswordError('')
    setValid(true)

    if (credentials.confirm_password != credentials.password) {
      setConfirmPasswordError('Пароли не совпадают')
      setValid(false)
    }

    if (credentials.password == '') {
      setPasswordError('Пароль не может быть пустым')
      setValid(false)
    }

    signupUser(credentials)
      .then(result => {
        if (result != 201){
          let emailError = result['email']
          if (emailError == 'user with this email already exists.'){
            setEmailError('Email-адрес уже зарегистрирован')
          }
          else if (emailError == 'Enter a valid email address.'){
            setEmailError('Email-адрес введен неверно')
          }
          else if (emailError == 'This field may not be blank.'){
            setEmailError('Поле обязательно для заполнения')
          }
          setValid(false)
        }
        else {
          setTimeout(() => navigate('/personal-account'), 1500)
        }
      })
  }

  return(
    <Container>
      <Wrapper>
        <RegisterBlock>
          <Left>
            <LeftImage src={image}/>
            <BigLabel>Регистрация!</BigLabel>
            <Separator/>
          </Left>
          <Right>
            <RightImage src={image2}/>
            <InputWrapper>
              <Input placeholder='Имя'
                onChange={(e) => setCredentials({...credentials, first_name: e.target.value})}/>
            </InputWrapper>
            <InputWrapper>
              <Input placeholder='Фамилия'
                onChange={(e) => setCredentials({...credentials, last_name: e.target.value})}/>
            </InputWrapper>
            <InputWrapper>
              <Input placeholder='Почта'
                onChange={(e) => setCredentials({...credentials, email: e.target.value})}/>
            </InputWrapper>
            {
            emailError
            ?
              <ErrorMessage><ErrorIcon/>{ emailError }</ErrorMessage>
            :
              <></>
            }
            <InputWrapper>
              <PasswordInput
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
            </InputWrapper>
            {
            passwordError
            ?
              <ErrorMessage><ErrorIcon/>{ passwordError }</ErrorMessage>
            :
              <></>
            }
            <InputWrapper>
              <PasswordInput placeholder="Повторить пароль"
                onChange={(e) => setCredentials({...credentials, confirm_password: e.target.value})}/>
            </InputWrapper>
            {
            confirmPasswordError
            ?
              <ErrorMessage><ErrorIcon/>{ confirmPasswordError }</ErrorMessage>
            :
              <></>
            }
            <CheckboxContainer>
              <CheckboxWrapper>
                <Checkbox type="checkbox"/>
                Я прочитал(а) и соглашаюсь с
                <CheckboxLink>
                  правилами сайта
                </CheckboxLink>
              </CheckboxWrapper>
              <CheckboxWrapper>
                <Checkbox type="checkbox"/>
                Даю согласие на
                <CheckboxLink>
                  обработку персональных данных
                </CheckboxLink>
              </CheckboxWrapper>
            </CheckboxContainer>
            <ButtonWrapper>
              <Button text='Регистрация' width='324px' handler={handleClick}/>
            </ButtonWrapper>
          </Right>
        </RegisterBlock>
      </Wrapper>
    </Container>
  )
};

export default Register;
