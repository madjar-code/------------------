import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'

import image from '../assets/images/CreateProfile1.svg'
import image2 from '../assets/images/CreateProfile.svg'
import image3 from '../assets/images/CreateProfile2.svg'
import image4 from '../assets/images/CreateProfile3.svg'
import image5 from '../assets/images/CreateProfile4.svg'
import image6 from '../assets/images/CreateProfile5.svg'
import image7 from '../assets/images/CreateProfileModal.svg'
import image8 from '../assets/images/CreateProfileModal2.svg'

import Header from "../components/Header";
import AuthContext from "../context/AuthContext";
import APIService from '../API/APIService'
import ErrorIcon from "../assets/images/ErrorIcon";


const Container = styled.div`
  min-height: 100vh;
  background: url(https://img.freepik.com/free-vector/white-abstract-background_23-2148810113.jpg?w=996&t=st=1675230059~exp=1675230659~hmac=8129915906b8d3bfc283e264c5b5096c651f5c4eeb8644ba86ed8c463fb5885d) center no-repeat fixed;
  background-size: cover;
`

const CenterContainer = styled.div`
  border-radius: 15px;
  position: relative;
  left: 50%;
  margin-left: -429.5px;
  width: 859px;
  padding-bottom: 60px;
  /* height: 859px; */
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Image = styled.img`
  width: 416px;
`

const BigLabel = styled.h2`
  font-size: 25px;
  color: #222222;
`

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 483px 1fr;
  column-gap: 60px;
  padding-left: 50px;
  padding-right: 40px;
`

const InputWrapper = styled.div`
  margin-top: 33px;
  width: 100%;
`

const SmallLabel = styled.p`
  font-size: 12px;
  color: #565656;
`

const Input = styled.input`
  margin-top: 3px;
  height: 34px;
  width: 483px;
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

  &::after {
    color: #FF7F50;
    border-color: #FF7F50;
    ::-webkit-input-placeholder {color:#FF7F50;}
    :-ms-input-placeholder      {color:#FF7F50;}    
  }
`

const DateInput = styled.input`
  margin-top: 3px;
  height: 34px;
  width: 220px;
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

const ErrorMessage = styled.p`
  width: 210px;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  margin-top: 10px;
  font-size: 12px;
  color: #FF4D4F;
`

const ModalErrorMessage = styled.p`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  margin-top: 5px;
  margin-left: 43px;
  font-size: 12px;
  color: #FF4D4F;
`

const PhoneInput = styled.input`
  margin-top: 3px;
  height: 34px;
  width: 220px;
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

const YearInput = styled.input`
  margin-top: 3px;
  height: 34px;
  width: 220px;
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

const Star = styled.span`
  color: red;
`

const BottomContainer = styled.div`
  height: 37px;
  margin-top: 60px;
  display: flex;
  justify-content: center;
`

const ProgressElement = styled.img`
`

const NextButton = styled.button`
  position: absolute;
  cursor: pointer;
  right: 40px;
  width: 118px;
  height: 37px;
  border-radius: 18.5px;
  background-color:#FF7F50;
  color: white;
  font-size: 13px;
`

const BackButton = styled.button`
  position: absolute;
  cursor: pointer;
  left: 50px;
  width: 118px;
  height: 37px;
  border-radius: 18.5px;
  background-color: white;
  color: black;
  border: 1px solid #FF7F50;
  font-size: 13px;
`

const SaveButton = styled.button`
  position: absolute;
  cursor: pointer;
  right: 40px;
  width: 118px;
  height: 37px;
  border-radius: 18.5px;
  background-color:#FF7F50;
  color: white;
  font-size: 13px;
`

const CloseButton = styled.img`
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
`

const AddLink = styled.a`
  margin-top: 10px;
  font-size: 15px;
  color: #565656;
  text-decoration: underline;
`

const Select = styled.select`
  margin-top: 3px;
  height: 34px;
  width: 220px;
  font-size: 14px;
  padding-left: 20px;
  color: #B3B1B0;
  border: 1px solid #E5E4E3;
  border-radius: 25px;
  outline: none;

  &:focus {
    color: #FF7F50;
    border-color: #FF7F50;
  }
`

const Option = styled.option`
  border-radius: 10px;
`

const ModalWindow = styled.div``

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
  height: 430px;
  border-radius: 15px;
  opacity: 1;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ModalBigLabel = styled.h2`
  color: #3D3B39;
  font-size: 22.5px;
  padding-top: 45px;
`

const ModalSmallLabel = styled.p`
  margin-left: 43px;
  font-size: 12px;
  color: #565656;
`

const ModalInput = styled.input`
  margin-left: 43px;
  margin-top: 3px;
  height: 34px;
  width: 442px;
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

const ModalImage = styled.img`
  margin-top: 5px;
`

const ModalMediumLabel = styled.h4`
  text-align: center;
  font-size: 17px;
  color: #3D3B39;
`

const ModalButton = styled.button`
  background-color: #FF7F50;
  height: 46px;
  width: 442px;
  margin-top: 25px;
  color: white;
  border-radius: 100px;
  font-size: 16px;
  cursor: pointer;
`

const CreateProfile = () => {
  let { user } = useContext(AuthContext)

  let [contentState, setContentState] = useState('about me')
  let [CVCredentials, setCVCredentials] = useState({
    first_name: '',
    last_name: '',
    birthday: '',
    sex: 'Мужской',
    contact_email: '',
    contact_phone: '',
    user: user?.user_id
  })

  let [birthdayError, setBirthdayError] = useState('')
  let [contactEmailError, setContactEmailError] = useState('')
  let [contactPhoneError, setContactPhoneError] = useState('')
  let [CVValid, setCVValid] = useState(false)

  let [eduCredentials, setEduCredentials] = useState({
    university: '',
    faculty: '',
    speciality: '',
    level: '',
    until_now_flag: false,
    start_year: 2000,
    end_year: 2001,
    CV: 0,
  })

  let [universityError, setUniversityError] = useState('')
  let [levelError, setLevelError] = useState('')
  let [facultyError, setFacultyError] = useState('')
  let [startYearError, setStartYearError] = useState('')
  let [endYearError, setEndYearError] = useState('')

  let [jobCredentials, setJobCredentials] = useState({
    company: '',
    position: '',
    start_date: '',
    end_date: '',
    until_now_flag: false,
    external_CV_link: '',
    CV: 0,
  })

  let [companyError, setCompanyError] = useState('')
  let [positionError, setPositionError] = useState('')
  let [startDateError, setStartDateError] = useState('')
  let [endDateError, setEndDateError] = useState('')
  let [linkError, setLinkError] = useState('')

  const handleSexSelect = (e) => {
    setCVCredentials({...CVCredentials, sex: e.target.value})
  }

  const handleLevelSelect = (e) => {
    setEduCredentials({...eduCredentials, level: e.target.value})
  }

  const CVValidate = () => {
    setContactEmailError('')
    setContactPhoneError('')
    setBirthdayError('')
    setCVValid(true)

    APIService.validateCV(CVCredentials)
    .then(result => {
      if (result != 200 && result != 201){
        if (result['contact_email']){
          setContactEmailError('Некорректный почтовый адрес')
        }
        if (result['contact_phone']){
          setContactPhoneError('Некорректный телефон')
          }
        if (result['birthday']){
          setBirthdayError('Некорректная дата рождения')
        }
      }
      else {
        setContentState('education')
      }
    })
  }

  const eduValidate = () => {
    setUniversityError('')
    setLevelError('')
    setFacultyError('')
    setStartYearError('')
    setEndYearError('')

    APIService.validateEdu(eduCredentials)
    .then(result => {
      if (result != 200 && result != 201){
        console.log(result)
        if (result['faculty']){
          setFacultyError('Это поле не может быть пустым')
        }
        if (result['university']){
          setUniversityError('Это поле не может быть пустым')
        }
        if (result['level']){
          setLevelError('Выберите уровень образования')
        }
        if (result['start_year']){
          setStartYearError('Некорректный год')
        }
        if (result['end_year']) {
          setEndYearError('Некорректный год')
        }
      }
      else {
        setContentState('job')
      }
    })
  }

  const jobValidate = () => {
    setCompanyError('')
    setPositionError('')
    setStartDateError('')
    setEndDateError('')

    APIService.validateJob(jobCredentials)
    .then(result => {
      if (result != 200 && result != 201){
        console.log(result)
        if (result['company']){
          setCompanyError('Это поле не должно быть пустым')
        }
        if (result['position']){
          setPositionError('Это поле не может быть пустым')
        }
        if (result['start_date']){
          setStartDateError('Некорректные данные')
        }
        if (result['end_date']){
          setEndDateError('Некорректные данные')
        }
      }
      else {
        setContentState('almost-complete')
      }
    })
  }

  const handleModalClick = () => {
    setLinkError('')
    APIService.validateJobLink(jobCredentials)
    .then(
      result => {
        if (result != 200 && result != 201){
          console.log(result['external_CV_link'])
          if (result['external_CV_link'] == 'Enter a valid URL.'){
            setLinkError('Некорректная ссылка')
          }
          else if (result['external_CV_link'] == 'This field may not be blank.'){
            setLinkError('Это поле не может быть пустым')
          }
        }
        else {
          APIService.createCV(CVCredentials).
          then(result => {
            let CV = result.id
            jobCredentials.CV = CV
            eduCredentials.CV = CV
            APIService.createEdu(eduCredentials)
            APIService.createJob(jobCredentials)
          })
          setContentState('complete')
        }
      }
    )
  }

  const handleOpenProfileClick = () => {
    navigate('/my-profiles')
  }

  const navigate = useNavigate()

  let content;

  if (contentState == 'about me'){
    content = (
      <>
      <Image src={image}/>
      <BigLabel>
        Расскажите о себе:
      </BigLabel>
      <InputContainer>
        <InputWrapper>
          <SmallLabel>Имя</SmallLabel>
          <Input
            placeholder="Введите текст"
            value={CVCredentials.first_name}
            onChange={e => setCVCredentials({...CVCredentials, first_name: e.target.value})}/>
        </InputWrapper>
        <InputWrapper>
          <SmallLabel>Дата рождения<Star>*</Star></SmallLabel>
          <DateInput placeholder="ГГГГ-ММ-ДД"
            value={CVCredentials.birthday}
            onChange={e => setCVCredentials({...CVCredentials, birthday: e.target.value})}
          />
          {
            birthdayError
          ?
            <ErrorMessage><ErrorIcon/>{ birthdayError }</ErrorMessage>
          :
            <></>
          }
        </InputWrapper>
        <InputWrapper>
          <SmallLabel>Фамилия</SmallLabel>
          <Input placeholder="Введите текст"
            value={CVCredentials.last_name}
            onChange={e => setCVCredentials({...CVCredentials, last_name: e.target.value})}/>
        </InputWrapper>
        <InputWrapper>
          <SmallLabel>Пол<Star>*</Star></SmallLabel>
          <Select value={CVCredentials.sex}
            onChange={e => handleSexSelect(e)}>
            <Option selected disabled>
              Выберите из списка
            </Option>
            <Option>Мужской</Option>
            <Option>Женский</Option>
          </Select>
        </InputWrapper>
        <InputWrapper>
          <SmallLabel>Почта</SmallLabel>
          <Input placeholder="Введите текст"
            value={CVCredentials.contact_email}
            onChange={e => setCVCredentials({...CVCredentials, contact_email: e.target.value})}
          />
          {
            contactEmailError
          ?
            <ErrorMessage><ErrorIcon/>{ contactEmailError }</ErrorMessage>
          :
            <></>
          }
        </InputWrapper>
        <InputWrapper>
          <SmallLabel>Контактный номер</SmallLabel>
          <PhoneInput placeholder="+7"
            value={CVCredentials.contact_phone}
            onChange={e => setCVCredentials({...CVCredentials, contact_phone: e.target.value})}
          />
          {
            contactPhoneError
          ?
            <ErrorMessage><ErrorIcon/>{ contactPhoneError }</ErrorMessage>
          :
            <></>
          }
        </InputWrapper>
      </InputContainer>
      <BottomContainer>
        <ProgressElement src={image2}/>
        <NextButton
          onClick={CVValidate}>
          Далее
        </NextButton>
      </BottomContainer>
      </>
    )
  } else if (contentState == 'education') {
    content = (
      <>
      <Image src={image3}/>
      <BigLabel>
        Образование:
      </BigLabel>
      <InputContainer>
        <InputWrapper>
          <SmallLabel>Учебное заведение<Star>*</Star></SmallLabel>
          <Input 
            value = {eduCredentials.university}
            placeholder="Введите текст"
            onChange={e => setEduCredentials({...eduCredentials, university: e.target.value})}/>
          {
            universityError
          ?
            <ErrorMessage><ErrorIcon/>{ universityError }</ErrorMessage>
          :
            <></>
          }
        </InputWrapper>
        <InputWrapper>
          <SmallLabel>Уровень<Star>*</Star></SmallLabel>
          <Select value={eduCredentials.sex}
            onChange={e => handleLevelSelect(e)}>
            <Option selected disabled>
              Выберите из списка
            </Option>
            <Option>Среднее специальное</Option>
            <Option>Высшее</Option>
          </Select>
          {
            levelError
          ?
            <ErrorMessage><ErrorIcon/>{ levelError }</ErrorMessage>
          :
            <></>
          }
        </InputWrapper>
        <InputWrapper>
          <SmallLabel>Факультет<Star>*</Star></SmallLabel>
          <Input
            value={eduCredentials.faculty}
            onChange={e => setEduCredentials({...eduCredentials, faculty: e.target.value})}
            placeholder="Введите текст"/>
          {
            facultyError
          ?
            <ErrorMessage><ErrorIcon/>{ facultyError }</ErrorMessage>
          :
            <></>
          }
        </InputWrapper>
        <InputWrapper>
          <SmallLabel>Начало обучениия<Star>*</Star></SmallLabel>
          <YearInput
            value={eduCredentials.start_year}
            onChange={e => setEduCredentials({...eduCredentials, start_year: e.target.value})}
            placeholder="Год"/>
            {
              startYearError
            ?
              <ErrorMessage><ErrorIcon/>{ startYearError }</ErrorMessage>
            :
              <></>
            }
        </InputWrapper>
        <InputWrapper>
          <SmallLabel>Специальность</SmallLabel>
          <Input
            value={eduCredentials.speciality}
            onChange={e => setEduCredentials({...eduCredentials, speciality: e.target.value})}
            placeholder="Введите текст"/>
        </InputWrapper>
        <InputWrapper>
          <SmallLabel>Год выпуска<Star>*</Star></SmallLabel>
          <YearInput
            value={eduCredentials.end_year}
            onChange={e => setEduCredentials({...eduCredentials, end_year: e.target.value})}
            placeholder="Год"/>
            {
              endYearError
            ?
              <ErrorMessage><ErrorIcon/>{ endYearError }</ErrorMessage>
            :
              <></>
            }
        </InputWrapper>
        <AddLink>Добавить</AddLink>
      </InputContainer>
      <BottomContainer>
        <BackButton
          onClick={() => setContentState('about me')}
          >
          Назад
        </BackButton>
        <ProgressElement src={image4}/>
        <NextButton
          onClick={eduValidate}>
          Далее
        </NextButton>
      </BottomContainer>
      </>
    )
  } else if (contentState == 'job' || contentState == 'almost-complete' || contentState == 'complete') {
    content = (
      <>
      { 
      contentState == 'almost-complete'
      ?
      <ModalWindow>
        <Background>
        <Block>
          <ModalBigLabel>Почти готово</ModalBigLabel>
          <ModalImage src={image7}/>
          <ModalMediumLabel>Отличная работа, финиш уже совсем близко</ModalMediumLabel>
          <InputWrapper>
            <ModalSmallLabel>Компания<Star>*</Star></ModalSmallLabel>
            <ModalInput
              value={jobCredentials.external_CV_link}
              onChange={e => setJobCredentials({...jobCredentials, external_CV_link: e.target.value})}
              placeholder="http://"
            />
            {
              linkError 
              ? <ModalErrorMessage><ErrorIcon/>{ linkError }</ModalErrorMessage>
              : <></>
            }
          </InputWrapper>
        <ModalButton
          onClick={handleModalClick}
          >
          Сохранить анкету
        </ModalButton>
      </Block>
      </Background>
      </ModalWindow>
      :
      <></>
      }
      { 
      contentState == 'complete'
      ?
      <ModalWindow>
        <Background>
        <Block>
          <ModalBigLabel>Сохранено!</ModalBigLabel>
          <ModalImage src={image8}/>
          <ModalButton
            onClick={handleOpenProfileClick}
            >
            Открыть анкету
          </ModalButton>
      </Block>
      </Background>
      </ModalWindow>
      :
      <></>
      }
      <Image src={image3}/>
      <BigLabel>
        Опыт работы:
      </BigLabel>
      <InputContainer>
        <InputWrapper>
          <SmallLabel>Компания<Star>*</Star></SmallLabel>
          <Input
            value={jobCredentials.company}
            onChange={e => setJobCredentials({...jobCredentials, company: e.target.value})}
            placeholder="Введите текст"/>
          {
            companyError
          ?
            <ErrorMessage><ErrorIcon/>{ companyError }</ErrorMessage>
          :
            <></>
          }
        </InputWrapper>
        <InputWrapper>
          <SmallLabel>Начало работы<Star>*</Star></SmallLabel>
          <DateInput placeholder="ГГГГ-ММ-ДД"
            value={jobCredentials.start_date}
            onChange={e => setJobCredentials({...jobCredentials, start_date: e.target.value})}
            />
          {
            startDateError
          ?
            <ErrorMessage><ErrorIcon/>{ startDateError }</ErrorMessage>
          :
            <></>
          }
        </InputWrapper>
        <InputWrapper>
          <SmallLabel>Должность<Star>*</Star></SmallLabel>
          <Input
            value={jobCredentials.position}
            onChange={e => setJobCredentials({...jobCredentials, position: e.target.value})}
            placeholder="Введите текст"/>
          {
            positionError
          ?
            <ErrorMessage><ErrorIcon/>{ positionError }</ErrorMessage>
          :
            <></>
          }
        </InputWrapper>
        <InputWrapper>
          <SmallLabel>Окончание<Star>*</Star></SmallLabel>
          <DateInput
            value={jobCredentials.end_date}
            onChange={e => setJobCredentials({...jobCredentials, end_date: e.target.value})}
            placeholder="ГГГГ-ММ-ДД"/>
          {
            startDateError
          ?
            <ErrorMessage><ErrorIcon/>{ startDateError }</ErrorMessage>
          :
            <></>
          }
        </InputWrapper>
        <AddLink>Добавить</AddLink>
      </InputContainer>
      <BottomContainer>
        <BackButton
          onClick={() => setContentState('education')}
          >
          Назад
        </BackButton>
        <ProgressElement src={image5}/>
        <SaveButton
          onClick={jobValidate}>
          Сохранить
        </SaveButton>
      </BottomContainer>
      </>
    )
  }
  
  return (
    <Container>
      <Header settings={false}/>
      <CenterContainer>
      <CloseButton
        src={image6}
        onClick={() => navigate('/my-profiles')}
      />
        {content}
      </CenterContainer>
    </Container>
  )
};

export default CreateProfile;
