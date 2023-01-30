import React from "react";
import styled from "styled-components";

import avatar from '../../assets/images/DefaultAvatar.png';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ReactComponent as Achievement } from "../../assets/images/AchievementItem.svg";


const Container = styled.div`
  position: relative;
  top: 20px;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
  background-color: #1A2E53;
  color: white;
`

const TopContainer = styled.div`
  position: relative;
  top: -20px;
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  background: linear-gradient(white, #F5F5F5);
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.25);
  color: black;
`

const WelcomeLabel = styled.h3`
  padding-top: 35px;
  font-size: 24px;
  font-weight: 600;
`

const Image = styled.img`
  margin-top: 20px;
  width: 137px;
  height: 137px;
  object-fit: cover;
  border-radius: 50%;
`

const NameLabel = styled.p`
  margin-top: 25px;
  font-weight: 500;
  font-size: 18px;
`

const AchContainer = styled.div`
  margin-top: 20px;
`

const AchLabel = styled.h3`
  font-size: 24px;
  text-align: center;
`

const AchRow = styled.div`
  margin-top: 40px;
  width: 262px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 25px;
`

const ButtonContainer = styled.div`
  margin-top: 50px;
  width: 280px;
`

const MyCourses = styled.button`
  margin-bottom: 18px;
  border-radius: 10px;
  width: 280px;
  height: 55px;
  color: white;
  background-color: #FF7F50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`

const Favorites = MyCourses

const Archive = MyCourses

const ButtonLabel = styled.p`
  margin-left: 19px;
  font-size: 18px;
`


const LeftBlock = ({ user }) => {

  let full_name;
  if ( user?.first_name != '' || user?.last_name != ''){
    full_name = user?.first_name + ' ' + user?.last_name
  } else {
    full_name = 'Имя и фамилия не указаны'
  }

  return (
    <Container>
      <TopContainer>
        <WelcomeLabel>C возвращением!</WelcomeLabel>
        <Image src={avatar}/>
        <NameLabel>{ full_name }</NameLabel>
        <NameLabel>
          {  }
        </NameLabel>
      </TopContainer>
      <AchContainer>
        <AchLabel>Достижения</AchLabel>
        <AchRow>
          <Achievement/>
          <Achievement/>
          <Achievement/>
          <Achievement/>
        </AchRow>
      </AchContainer>
      <ButtonContainer>
        <MyCourses>
          <ButtonLabel>Мои курсы</ButtonLabel>
          <ChevronRightIcon fontSize="large"/>
        </MyCourses>
        <Favorites>
          <ButtonLabel>Избранное</ButtonLabel>
          <ChevronRightIcon fontSize="large"/>
        </Favorites>
        <Archive>
          <ButtonLabel>Архив</ButtonLabel>
          <ChevronRightIcon fontSize="large"/>
        </Archive>
      </ButtonContainer>
    </Container>
  )
};

export default LeftBlock;
