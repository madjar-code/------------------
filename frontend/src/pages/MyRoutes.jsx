import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import image from '../assets/images/MyRoutes.svg'
import image2 from '../assets/images/MyProfiles2.svg'

import Header from '../components/Header'
import ConfirmDeletion from '../components/ConfirmDeletion'
import AuthContext from '../context/AuthContext'
import APIService from '../API/APIService'


const Container = styled.div`
  min-height: 100vh;
  background: url(https://img.freepik.com/free-vector/white-abstract-background_23-2148810113.jpg?w=996&t=st=1675230059~exp=1675230659~hmac=8129915906b8d3bfc283e264c5b5096c651f5c4eeb8644ba86ed8c463fb5885d) center no-repeat fixed;
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
  padding: 43px 67px;
  display: grid;
  grid-template-rows: 1fr 46px;
`

const BigLabel = styled.h2`
  font-size: 28px;
  padding-bottom:  60px;
  color: #222222;
`

const MyRoutesContainer = styled.div`
`

const MyRoute = styled.div`
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.15);
  margin-bottom: 40px;
  height: 153px;
  background-color: #F5F5F5;
  border-radius: 10px;
  position: relative;
`

const Image = styled.img`
  margin-top: 14px;
  margin-left: 17px;
`

const Title = styled.h3`
  color: #263238;
  font-size: 22px;
  position: absolute;
  top: 20px;
  left: 170px;
`

const Date = styled.p`
  position: absolute;
  font-size: 17px;
  top: 60px;
  left: 170px;
`

const Link = styled.img`
  cursor: pointer;
  position: absolute;
  top: 68px;
  right: 28px;
`

const DeleteButton = styled.button`
  cursor: pointer;
  position: absolute;
  font-size: 13px;
  text-decoration: underline;
  color: #747166;
  right: 30px;
  bottom: 13px;

  &:hover{
    color: black;
  }
`

const CreateButton = styled.button`
  width: 366px;
  height: 46px;
  background-color: #FF7F50;
  border-radius: 23px;
  color: white;
  font-size: 18px;
  cursor: pointer;
  position: relative;
  left: 50%;
  margin-left: -183px;
`


const MyRoutes = () => {
  let { authTokens } = useContext(AuthContext)

  let [openModal, setOpenModal] = useState(false)
  let [routeID, setRouteID] = useState(null)
  let [myRoutes, setMyRoutes] = useState([])

  useEffect(() => {
    APIService.getCurrentRoutes(authTokens)
    .then(result => setMyRoutes(result))
  }, [authTokens])

  const handleOpenModal = (id) => {
    setOpenModal(true)
    setRouteID(id)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleDelete = () => {
    APIService.deleteRoute(routeID)
    setMyRoutes(myRoutes.filter(
      route => route.id != routeID))
    handleCloseModal()
  }

  const navigate = useNavigate()
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
        <MyRoutesContainer>
          <BigLabel>Мои маршруты:</BigLabel>
          {
          myRoutes.map((item, index) =>
          <MyRoute>
            <Image src={image}/>
            <Title>{ item?.title }</Title>
            <Date>{item?.creation_date}</Date>
            <Link src={image2} onClick={() => navigate(`/my-routes/${item?.id}`)}/>
            <DeleteButton
              onClick={() => handleOpenModal(item?.id)}
            >
              Удалить
            </DeleteButton>
          </MyRoute>
          )}
        </MyRoutesContainer>
        <CreateButton
          onClick={() => navigate('/create-route')}
        >
          Построить маршрут
        </CreateButton>
      </CenterContainer>
    </Container>
  )
};

export default MyRoutes;
