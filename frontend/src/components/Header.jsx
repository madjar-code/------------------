import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from 'react-router-dom'
import styled from "styled-components";
import image from '../assets/images/header.svg'


const Container = styled.div`
  background-color: #1A2E53;
  height: 60px;
  width: 100%;
`

const Wrapper = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Left = styled.div`
  margin-left: 60px;
  width: 300px;
  display: flex;
  align-items: center;
`

const Logo = styled.img`
  display: flex;
  float: left;
  width: 55px;
  height: 55px;
  &:hover {
    cursor: pointer;
  }
`

const Label = styled.p`
  color: white;
  margin-left: 5px;
  font-size: 14px;
  &:hover {
    cursor: pointer;
  }
`

const Right = styled.div`
`

const LeftButton = styled.button`
  margin-right: 14px;
  width: 140px;
  height: 33px;
  border-radius: 16.5px;
  color: white;
  font-size: 12px;
  background-color: #FF7F50;
  cursor: pointer;
`

const RightButton = styled.button`
  margin-right: 60px;
  width: 76px;
  height: 33px;
  border-radius: 16.5px;
  color: white;
  font-size: 12px;
  background-color: #FF7F50;
  cursor: pointer;
`


const Header = ({ handleOpen, settings=true }) => {
  const navigate = useNavigate()
  let { logoutUser } = useContext(AuthContext)

  const toHome = () => {
    navigate('/personal-account')
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo src={image} onClick={toHome}/>
          <Label onClick={toHome}>Карьерный навигатор</Label>
        </Left>
        <Right>
          {
            settings
            ?
              <LeftButton onClick={handleOpen}>Настройки</LeftButton>
            :
              <></>
          }
          <RightButton
            onClick={
              () => {
                logoutUser()
                navigate('/login')
              }
            }
            >
            Выйти
          </RightButton>
        </Right>
      </Wrapper>
    </Container>
  )
};

export default Header;
