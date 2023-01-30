import { useState, useContext } from "react";
import styled from 'styled-components'
import image from '../../assets/images/PAModal.svg'
import image2 from '../../assets/images/CloseIcon.svg'
import image3 from '../../assets/images/PAModal2.svg'
import APIService from "../../API/APIService";
import AuthContext from "../../context/AuthContext";

import ErrorIcon from "../../assets/images/ErrorIcon";


const Background = styled.div`
  background-color: rgba(241, 241, 241, 0.8);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Block = styled.div`
  position: relative;
  width: 527px;
  /* height: 445px; */
  border-radius: 15px;
  opacity: 1;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;
`

const Label = styled.h2`
  font-size: 28px;
  margin-top: 50px;
  margin-bottom: -10px;
  font-weight: 500;
  color: #3D3B39;
`

const Image = styled.img`
  margin-top: 15px;
`

const CloseButton = styled.img`
  position: absolute;
  right: 25px;
  top: 18px;
  cursor: pointer;
`

const Button = styled.button`
  margin-top: 14px;
  height: 46px;
  width: 369px;
  background-color: #FF7F50;
  color: white;
  border-radius: 23px;
  font-size:  17px;
  cursor: pointer;
`

const InputWrapper = styled.div`
  margin-top: 30px;
`

const SmallLabel = styled.p`
  font-size: 12px;
  color: #565656;
`

const ErrorMessage = styled.p`
  width: 369px;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  margin-top: 10px;
  font-size: 12px;
  color: #FF4D4F;
`

const Input = styled.input`
  margin-top: 3px;
  height: 38px;
  width: 369px;
  font-size: 14px;
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

const CompleteImage = styled.img`
  color: #3D3B39;
`

const BigLabel = styled.h2`
`


const MainModal = ({ handleClose }) => {
  let { authTokens } = useContext(AuthContext)

  let [modalState, setModalState] = useState('default')

  let [passwords, setPasswords] = useState(
    {
      old_password: '',
      new_password: '',
      new_password2: ''
    }
  )
  let [oldPasswordError, setOldPasswordError] = useState('')
  let [newPasswordError, setNewPasswordError] = useState('')
  let [emptyFieldsError, setEmptyFieldsError] = useState('')

  let [emails, setEmails] = useState(
    {
      password: '',
      old_email: '',
      new_email: '',
    }
  )

  let [passwordError, setPasswordError] = useState('')
  let [oldEmailError, setOldEmailError] = useState('')
  let [newEmailError, setNewEmailError] = useState('')

  let content;

  const handleChangePassword = () => {

    setOldPasswordError('')
    setNewPasswordError('')
    setEmptyFieldsError('')
  
    APIService.changePassword(passwords, authTokens)
    .then(result => {
      if (result != 200) {
        if (result['empty_fields_error']){
          setEmptyFieldsError('Все поля должны быть заполнены')
        }
        if (result['old_password']){
          setOldPasswordError(result['old_password'])
        }
        if (result['new_password']){
          setNewPasswordError(result['new_password'])
        }
      }
      else {
        setModalState('complete')
      }
    })
  }

  const handleChangeEmail = () => {
    setOldEmailError('')
    setPasswordError('')
    setNewEmailError('')
  
    APIService.changeEmail(emails, authTokens)
    .then(result => {
      if (result != 200) {
        if (result['new_email']){
          console.log(result['new_email'])
          if (result['new_email'] == 'Enter a valid email address.'){
            setNewEmailError('Некорректная почта')
          }
          else {
            setNewEmailError(result['new_email'])
          }
        }
        if (result['old_email']){
          setOldEmailError(result['old_email'])
        }
        if (result['password']){
          setPasswordError(result['password'])
        }
      }
      else {
        setModalState('complete')
      }
    })
  }
  
  if (modalState == 'default'){
    content = (
      <>
      <Label>Настройки приватности</Label>
      <Image src={image}/>
      <Button onClick={() => setModalState('change-email')}>
        Изменить почту
      </Button>
      <Button onClick={() => setModalState('change-password')}>
        Изменить пароль
      </Button>
      </>
    )
  } else if (modalState == 'change-email'){
    content = (
      <>
      <Label>Изменить почту</Label>
      <InputWrapper>
        <SmallLabel>Почта, привязанная к аккаунту
          <Star>*</Star>
        </SmallLabel>
        <Input placeholder="Введите текст" value={emails.old_email}
          onChange={(e) => setEmails({...emails, old_email: e.target.value})}/>
      </InputWrapper>
      {
      oldEmailError
      ?
        <ErrorMessage><ErrorIcon/>{ oldEmailError }</ErrorMessage>
      :
        <></>
      }
      <InputWrapper>
        <SmallLabel>Новый адрес электронной почты
          <Star>*</Star>
        </SmallLabel>
        <Input placeholder="Введите текст" value={emails.new_email}
          onChange={(e) => setEmails({...emails, new_email: e.target.value})}/>
      </InputWrapper>
      {
      newEmailError
      ?
        <ErrorMessage><ErrorIcon/>{ newEmailError }</ErrorMessage>
      :
        <></>
      }
      <InputWrapper>
        <SmallLabel>Пароль
          <Star>*</Star>
        </SmallLabel>
        <PasswordInput placeholder="Введите текст" type="password"
          value={emails.password} onChange={(e) => setEmails({...emails, password: e.target.value})}/>
      </InputWrapper>
      {
      passwordError
      ?
        <ErrorMessage><ErrorIcon/>{ passwordError }</ErrorMessage>
      :
        <></>
      }
      <Button
        style={{marginTop: '40px'}}
        onClick={handleChangeEmail}
        >
          Сохранить изменения
      </Button>
      </>
    )

  } else if (modalState == 'change-password') {
    content = (
      <>
      <Label>Изменить пароль</Label>
      {
      emptyFieldsError
      ?
        <ErrorMessage><ErrorIcon/>{ emptyFieldsError }</ErrorMessage>
      :
        <></>
      }
      <InputWrapper>
        <SmallLabel>Старый пароль
          <Star>*</Star>
        </SmallLabel>
        <PasswordInput
          value={passwords.old_password}
          onChange={e => setPasswords({...passwords, old_password: e.target.value})}
          placeholder="Введите текст" type="password"/>
      </InputWrapper>
      {
      oldPasswordError
      ?
        <ErrorMessage><ErrorIcon/>{ oldPasswordError }</ErrorMessage>
      :
        <></>
      }
      <InputWrapper>
        <SmallLabel>Новый пароль
          <Star>*</Star>
        </SmallLabel>
        <PasswordInput
          value={passwords.new_password}
          onChange={e => setPasswords({...passwords, new_password: e.target.value})}
          placeholder="Введите текст" type="password"/>
      </InputWrapper>
      <InputWrapper>
        <SmallLabel>Повторите пароль
          <Star>*</Star>
        </SmallLabel>
        <PasswordInput
          value={passwords.new_password2}
          onChange={e => setPasswords({...passwords, new_password2: e.target.value})}
          placeholder="Введите текст" type="password"/>
      </InputWrapper>
      {
      newPasswordError
      ?
        <ErrorMessage><ErrorIcon/>{ newPasswordError }</ErrorMessage>
      :
        <></>
      }
      <Button
        onClick={handleChangePassword}
        style={{marginTop: '40px'}}
        >
          Сохранить изменения
      </Button>
      </>
    )
  } else if (modalState == 'complete') {
    content = (
      <>
        <CompleteImage src={image3}/>
        <BigLabel>Изменения сохранены!</BigLabel>
      </>
    )
  }

  return (
    <Background>
      <Block>
      <CloseButton
        src={image2}
        onClick={handleClose}
      />
      {content}
      </Block>
    </Background>
  )
};

export default MainModal;
