import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'

import Header from "../components/Header";
import LeftBlock from "../components/PersonalAccount/LeftBlock";
import CareerRoutes from "../components/PersonalAccount/CareerRoutes";
import MyProfile from "../components/PersonalAccount/MyProfile";
import image1 from '../assets/images/PA3.svg';
import image2 from '../assets/images/PA4.svg';
import image3 from '../assets/images/PA5.svg';
import image4 from '../assets/images/PA6.svg';
import image5 from '../assets/images/PA7.svg';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MainModal from "../components/PersonalAccount/MainModal";
import APIService from "../API/APIService";
import AuthContext from '../context/AuthContext'


const Container = styled.div`
  overflow-x: hidden;
  min-height: 100vh;
`

const Wrapper = styled.div`
  position: relative;
  left: 50%;
  margin-left: -650px;
  padding-top: 90px;
  padding-bottom: 70px;
  display: grid;
  grid-template-columns: 414px 823px;
  column-gap: 75px;
`

const Left = styled.div`
`

const Right = styled.div`
`

const TopContainer = styled.div`
  display: grid;
  grid-template-columns: 388px 388px;
  column-gap: 50px;
`

const MiddleContainer = styled.div`
  margin-top: 40px;
`

const BigLabel = styled.h2`
  font-size: 40px;
`

const Actual = styled.div`
  margin-top: 25px;
  background-color: #F5F5F5;
  height: 263px;
  border-radius: 20px;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.15);
`

const ActualLabel = styled.h3`
  padding-top: 20px;
  padding-left: 35px;
  font-size: 25px;
`

const ActualWrapper = styled.div`
  padding-left: 35px;
  padding-right: 35px;
  margin-top: 22px;
  display: grid;
  grid-template-columns: repeat(3, 219px);
  column-gap: 44px;
`

const ActualItem = styled.div`
  width: 219px;
  height: 117px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #E1E9FE;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.12);
`

const Image = styled.img`
  margin-top: -5px;
`

const Title = styled.p`
  margin-top: 10px;
  width: 300px;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
`

const BottomContainer = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-rows: 97px 97px;
  row-gap: 22px;
`

const Education = styled.div`
  padding-left: 6px;
  height: 97px;
  width: 100%;
  background-color: #F5F5F5;
  border-radius: 10px;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.15);
  display: grid;
  grid-template-columns: 110px 1fr 60px;
`

const Career = Education

const EducationLabel = styled.p`
  align-self: center;
  font-size: 24px;
  font-weight: 600;
  color: #263238;
`

const CareerLabel = EducationLabel

const IconWrapper = styled.div`
  align-self: center;
`


const PersonalAccount = () => {
  let { authTokens } = useContext(AuthContext)
  let [currentUser, setCurrentUser] = useState(null)
  let [actualItems, setActualItems] = useState([])

  useEffect(() => {
    APIService.getCurrentUser(authTokens)
      .then((data) => {
        setCurrentUser(data)
      })
  }, [authTokens])

  useEffect(() => {
    APIService.getActualPR(authTokens)
      .then((data) => {
        setActualItems(data)
      })
  }, [authTokens])

  const [openModal, setOpenModal] = useState(false)

  const navigate = useNavigate()

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <Container>
      {
        openModal
        ? 
          <MainModal handleClose={handleCloseModal}/>
        :
          <></>
      }
      
      <Header handleOpen={handleOpenModal}/>
      <Wrapper>
        <Left>
          <LeftBlock user={currentUser}/>
        </Left>
        <Right>
          <TopContainer>
            <MyProfile/>
            <CareerRoutes/>
          </TopContainer>
          <MiddleContainer>
            <BigLabel>Рекомендации</BigLabel>
            <Actual>
              <ChevronRightIcon
                onClick={() => navigate('/actual')}
                fontSize="large" sx={{
                  position: 'absolute',
                  cursor: 'pointer',
                  marginLeft: '760px',
                  marginTop: '25px'}}/>
              <ActualLabel>Актуальное</ActualLabel>
              <ActualWrapper>
                {actualItems.map(item => (
                  <ActualItem>
                    <Image src={item?.image}/>
                    <Title>{item?.title}</Title>
                  </ActualItem>
                ))}
              </ActualWrapper>
            </Actual>
          </MiddleContainer>
          <BottomContainer>
            <Education>
              <Image src={image4}/>
              <EducationLabel>Образование</EducationLabel>
              <IconWrapper>
                <ChevronRightIcon
                  onClick={() => navigate('/education')}
                  fontSize="large" sx={{ cursor: 'pointer'}}/>
              </IconWrapper>
            </Education>
            <Career>
              <Image src={image5}/>
              <CareerLabel>Карьера</CareerLabel>
              <IconWrapper>
                <ChevronRightIcon
                  onClick={() => navigate('/career')}
                  fontSize="large" sx={{ cursor: 'pointer'}}/>
              </IconWrapper>
            </Career>
          </BottomContainer>
        </Right>
      </Wrapper>
    </Container>
  )
};

export default PersonalAccount;
