import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import APIService from "../../API/APIService"
import image from '../../assets/images/CloseIcon.svg'
import image2 from '../../assets/images/CreateRoute2.svg'
import image3 from '../../assets/images/CreateRoute3.svg'
import image4 from '../../assets/images/CreateRoute6.svg'
import AuthContext from "../../context/AuthContext"
import Button from "../Button"
import MySelect from "../MySelect"
import ErrorIcon from "../../assets/images/ErrorIcon";


const CenterModal = ({ handleClose, handleComplete, setRouteID }) => {
  let { user } = useContext(AuthContext)
  const navigate = useNavigate()

  let [modalState, setModalState] = useState('route title')

  const startNodes = [
    {
      id: 498,
      title: 'кассир-бармен',
    },
    {
      id: 218,
      title: 'помощник бухгалтера',
    },
    {
      id: 384,
      title: 'официант',
    },
    {
      id: 20,
      title: 'МГТУ им. Н.Э. Баумана',
    },
    {
      id: 31,
      title: 'Высшая школа экономики',
    }
  ]
  const endNodes = [
    {
      id: 204,
      title: 'инженер',
    },
    {
      id: 22,
      title: 'менеджер',
    },
    {
      id: 29,
      title: 'начальник отдела',
    },
    {
      id: 30,
      title: 'начальник управления',
    }
  ]

  let [profiles, setProfiles] = useState([])
  let [routeTypes, setRouteTypes] = useState([])

  let {authTokens} = useContext(AuthContext)

  let [route, setRoute] = useState({
    title: '',
    user: user?.user_id,
    start_node: '',
    route_type: '',
    end_node: ''
  })

  let [titleError, setTitleError] = useState('')
  let [CVError, setCVError] = useState('')
  let [routeTypeError, setRouteTypeError] = useState('')
  let [targetError, setTargerError] = useState('')
  let [isValid, setValid] = useState(true)

  const handleData = () => {
    setCVError('')
    setRouteTypeError('')
    setTargerError('')
    isValid = true
    setValid(isValid)
    if (route.start_node == ''){
      setCVError('Выберите старт')
      isValid = false
      setValid(isValid)
    }
    if (route.route_type == ''){
      setRouteTypeError('Выберите трек')
      isValid = false
      setValid(isValid)
    }
    if (route.end_node == ''){
      setTargerError('Выберите цель')
      isValid = false
      setValid(isValid)
    }
    if (isValid == true) {
      APIService.createRoute(route)
        .then(result => {
          if (result.message == 'No path'){
            alert('Не удалось построить путь между этими профессиями')
            return
          }
          setRouteID(result.id)
          handleClose()
          handleComplete()
        }
      )
    }
  }

  useEffect(() => {
    APIService.getRouteTypes()
    .then(result => setRouteTypes(result))
  }, [])

  let content;

  if (modalState == 'no profiles'){
    content = (
      <NoProfilesBlock>
        <CloseButton
          src={image}
          onClick={() => navigate('/my-routes')}
        />
        <BigLabel>
          Не найдено ни одной анкеты!
        </BigLabel>
        <Image src={image4}/>
        <ButtonWrapper>
          <Button width="366px" height="46px" text="Заполнить анкету"
            handler={() => navigate('/create-profile')}/>
        </ButtonWrapper>
      </NoProfilesBlock>
    )
  } else if (modalState == 'route title') {
    content = (
      <TitleBlock>
        <CloseButton
          src={image}
          onClick={() => navigate('/my-routes')}
        />
        <BigLabel>
          Как лодку назовешь, так она и поплывет
        </BigLabel>
        <Image src={image3}/>
        <InputWrapper>
          <SmallLabel>Название маршрута<Star>*</Star></SmallLabel>
          <Input placeholder="Введите текст..."
            value={route.title} onChange={(e) => setRoute({...route, title: e.target.value})}/>
          {
            titleError
          ?
            <ErrorMessage><ErrorIcon/>{ titleError }</ErrorMessage>
          :
            <></>
          }
        </InputWrapper>
        <ButtonWrapper>
          <Button width="366px" height="46px" text="Далее"
            handler={() => {
              setTitleError('')
              if (route.title == ''){
                setTitleError('Это обязательное поле')
              }
              else {
                setModalState('select route')
              }
            }}/>
        </ButtonWrapper>
      </TitleBlock>
    )
  } else if (modalState == 'select route'){
    content = (
      <SelectBlock>
        <CloseButton
          src={image}
          onClick={() => navigate('/my-routes')}
        />
        <BigLabel>
          Выбор маршрута
        </BigLabel>
        <Image src={image3}/>
        <SelectsWrapper>
          <SmallLabel>Начало<Star>*</Star></SmallLabel>
          <MySelect
            listName="Выберите профессию/ место учебы"
            items={startNodes}
            selectedItem={route.start_node}
            setSelectedItem={(item) => setRoute({...route, start_node: item?.id})}
          />
          {
            CVError
          ?
            <ErrorMessage><ErrorIcon/>{ CVError }</ErrorMessage>
          :
            <></>
          }
          <SmallLabel>Карьерный трек<Star>*</Star></SmallLabel>
          <MySelect
            listName="Выберите трек"
            items={routeTypes}
            selectedItem={route.route_type}
            setSelectedItem={(item) => setRoute({...route, route_type: item?.id})}
          />
          {
            routeTypeError
          ?
            <ErrorMessage><ErrorIcon/>{ routeTypeError }</ErrorMessage>
          :
            <></>
          }
          <SmallLabel>Желаемая цель<Star>*</Star></SmallLabel>
          <MySelect
            listName="Выберите цель"
            items={endNodes}
            selectedItem={route.end_node}
            setSelectedItem={(item) => setRoute({...route, end_node: item?.id})}
          />
          {
            targetError
          ?
            <ErrorMessage><ErrorIcon/>{ targetError }</ErrorMessage>
          :
            <></>
          }
        </SelectsWrapper>
        <Button width="452px" height="46px" text="Построить маршрут"
          handler={() => {
            handleData()
          }}/>
      </SelectBlock>
    )
  }

  return (
    <Background>
      { content }
    </Background>
  )
};

export default CenterModal;


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

const ErrorMessage = styled.p`
  width: 210px;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  margin-top: 5px;
  margin-bottom: -12px;
  font-size: 12px;
  color: #FF4D4F;
`

const NoProfilesBlock = styled.div`
  position: relative;
  width: 527px;
  min-height: 300px;
  border-radius: 15px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Star = styled.span`
  color: red;
`

const TitleBlock = styled.div`
  position: relative;
  width: 527px;
  min-height: 430px;
  border-radius: 15px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CloseButton = styled.img`
  position: absolute;
  right: 25px;
  top: 18px;
  cursor: pointer;
  width: 30px;
`

const BigLabel = styled.h3`
  width: 500px;
  font-size: 21px;
  text-align: center;
  margin-top: 40px;
  color: #3D3B39;
`

const Image = styled.img`
  margin-top: 6px;
`

const InputWrapper = styled.div`
`

const SmallLabel = styled.p`
  margin-top: 30px;
  margin-bottom: 5px;
  font-size: 12px;
  color: #565656;
`

const Input = styled.input`
  margin-top: 5px;
  height: 30px;
  width: 366px;
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

const ButtonWrapper = styled.div`
  margin: 30px;
`

const SelectBlock = styled.div`
  width: 527px;
  min-height: 710px;
  background-color: white;
  position: relative;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SelectsWrapper = styled.div`
  margin-top: -10px;
  margin-bottom: 50px;
`
