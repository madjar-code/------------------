import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
import APIService from "../API/APIService";
import image from '../assets/images/MyProfiles.svg'
import image2 from '../assets/images/MyProfiles2.svg'

import Header from "../components/Header";
import ConfirmDeletion from "../components/ConfirmDeletion";
import AuthContext from "../context/AuthContext";


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

const MyProfilesContainer = styled.div`
`

const MyProfile = styled.div`
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


const MyProfiles = () => {
  const { authTokens } = useContext(AuthContext)

  let [myProfiles, setMyProfiles] = useState([])
  let [profileID, setProfileID] = useState(null)

  useEffect(() => {
    APIService.getCurrentProfiles(authTokens)
    .then(data => setMyProfiles(data))
  }, [authTokens])

  const [openModal, setOpenModal] = useState(false)
  const navigate = useNavigate()

  const handleOpenModal = (id) => {
    setOpenModal(true)
    setProfileID(id)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleDelete = () => {
    APIService.deleteCV(profileID)
    setMyProfiles(myProfiles.filter(
      profile => profile.id != profileID))
    handleCloseModal()
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
        <MyProfilesContainer>
          <BigLabel>Мои записи:</BigLabel>
          { myProfiles.map((item, index) =>
           <MyProfile key={index}>
            <Image src={image}/>
            <Title>{item?.title}</Title>
            <Date>{item?.creation_date}</Date>
            <Link src={image2} onClick={() => navigate(`/my-profiles/${item?.id}`)}/>
            <DeleteButton
              onClick={() => handleOpenModal(item?.id)}
            >
                Удалить
            </DeleteButton>
          </MyProfile>
          )}
        </MyProfilesContainer>
        <CreateButton onClick={() => navigate('/create-profile')}>
          Создать анкету
        </CreateButton>
      </CenterContainer>
    </Container>
  )
};

export default MyProfiles;
