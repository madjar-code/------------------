import { useState, useEffect } from "react";
import Header from "../components/Header";

import image from '../assets/images/CreateProfile5.svg'
import styled, { css } from 'styled-components'
import { useNavigate, useParams } from "react-router-dom";
import APIService from "../API/APIService";
import ConfirmDeletion from "../components/ConfirmDeletion";


const Container = styled.div`
  min-height: 100vh;
  background: url(/images/Background.jpg) center no-repeat fixed;
  background-size: cover;
`

const CenterContainer = styled.div`
  border-radius: 20px;
  position: relative;
  left: 50%;
  margin-left: -429.5px;
  width: 859px;
  min-height: 100vh;
  background-color: white;
  padding: 58px 110px;
`

const BigLabel = styled.h2`
  font-size: 30px;
  text-align: center;
`

const ContentContainer = styled.div`
  margin-top: 30px;
`

const Content = styled.div`
  font-size: 16px;
`

const CloseButton = styled.img`
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
`

const ButtonWrapper = styled.div`  
`

const ButtonStyles = css`
  width: 547px;
  height: 46px;
  border-radius: 23px;
  background-color: #FF7F50;
  color: white;
  cursor: pointer;
`

const ShareButton = styled.button`
  position: relative;
  left: 50%;
  margin-left: -273.5px;
  margin-top: 30px;
  ${ButtonStyles};
`

const DeleteButton = styled.button`
  position: relative;
  left: 50%;
  margin-left: -273.5px;
  margin-top: 15px;
  ${ButtonStyles}
`

const RouteDetails = () => {
  const params = useParams()
  const navigate = useNavigate()

  let [route, setRoute] = useState()
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    APIService.getOneRoute(params.id)
    .then(data => setRoute(data))
  }, [params.id])

  let rawHTML = route?.html_code

  if (!rawHTML){
    rawHTML = '<h4>Нет контента статьи</h2>'
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleDelete = () => {
    APIService.deleteRoute(route?.id)
    handleCloseModal()
    navigate('/my-routes')
  }

  return (
    <Container>
      {
        openModal
      ? 
        <ConfirmDeletion handleClose={handleCloseModal} handleDelete={handleDelete}/>
      :
        <></>
      }
      <Header settings={false}/>
      <CenterContainer>
        <BigLabel>{route?.title}</BigLabel>

        <ContentContainer>
          <Content dangerouslySetInnerHTML={{ __html: rawHTML }}>

          </Content>
        </ContentContainer>

        <CloseButton
          src={image}
          onClick={() => navigate('/my-routes')}
        />
        <ButtonWrapper>
          <ShareButton>Поделиться</ShareButton>
        </ButtonWrapper>
        <ButtonWrapper>
          <DeleteButton onClick={() => setOpenModal(true)}>Удалить</DeleteButton>
        </ButtonWrapper>
      </CenterContainer>
    </Container>
  )
};

export default RouteDetails;
