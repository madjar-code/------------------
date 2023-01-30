import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Button from "../components/Button";

import image from '../assets/images/CreateRoute.svg'
import image2 from '../assets/images/CreateRoute4.svg'
import image3 from '../assets/images/CreateRoute5.svg'
import CenterModal from "../components/CreateRoute/CenterModal";
import APIService from "../API/APIService";


const Container = styled.div`
  min-height: 100vh;
  background: url(/images/Background.jpg) center no-repeat fixed;
  background-size: cover;
`

const MiddleContainer = styled.div`
  margin-top: 25px;
  background-color: white;
  height: 670px;
  border-radius: 30px;
`

const MiddleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 670px;
`

const Image = styled.img`
`

const BigLabel = styled.h4`
  font-size: 35px;
  color: #222222;
`

const MediumLabel = styled.h6`
  margin-top: -30px;
  margin-bottom: 30px;
  font-size: 26px;
  color: #222222;
`

const ButtonWrapper = styled.div`
  margin-bottom: 19px;
`

const CreateRoute = () => {
  let [openModal, setOpenModal] = useState(true)
  let [contentState, setContentState] = useState('start')
  let [routeID, setRouteID] = useState(null)

  const navigate = useNavigate()

  const handleCloseModal = () => {
    setOpenModal(false)
  }
  
  const handleCompleteModal = () => {
    setContentState('creation')
  }

  let content;
  if (contentState == 'start') {
    content = (
      <>
      <Image src={image}/>
      <Button text='Синхронизация'/>
      </>
    )
  } else if (contentState == 'creation') {
    content = (
      <>
      <Image src={image2}/>
      <BigLabel>Строим лучший маршрут...</BigLabel>
      </>
    )
    setTimeout(() => setContentState('complete'), 3000)
  } else if (contentState == 'complete') {
    content = (
      <>
      <Image src={image3}/>
      <MediumLabel>Готово!</MediumLabel>
      <ButtonWrapper>
        <Button
          height="46px" width="369px"
          text="Открыть" handler={() => {
            navigate(`/my-routes/${routeID}`)
          }}/>
      </ButtonWrapper>
      <ButtonWrapper>
        <Button
          height="46px" width="369px"
          text="Удалить" handler={() => {
            APIService.deleteRoute(routeID)
            navigate('/my-routes')
            }}/>
      </ButtonWrapper>
      </>
    )
  }

  return (
    <Container>
      {
        openModal
        ? <CenterModal
            handleClose={handleCloseModal}
            handleComplete={handleCompleteModal}
            setRouteID={setRouteID}/>
        : <></>
      }
      <Header settings={false}/>

      <MiddleContainer>
        <MiddleWrapper>
          
          { content }

        </MiddleWrapper>
      </MiddleContainer>
    </Container>
  )
};

export default CreateRoute;
