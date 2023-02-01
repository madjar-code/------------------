import React from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
import { ReactComponent as Image } from "../../assets/images/PA.svg";

const Container = styled.div`
  width: 388px;
  height: 202px;
  background-color: #F5F5F5;
  border-radius: 10px;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.15);
`

const Wrapper = styled.div`
  height: 202px;
  padding-left: 17px;
  padding-right: 5px;
  padding-top: 20px;
  display: grid;
  grid-template-columns: 207px 1fr;
`

const TextContainer = styled.div`
  width: 210px;
  display: grid;
  grid-template-rows: 60px  95px 1fr;
`

const Label = styled.h2`
  font-size: 26px;
`

const Description = styled.div`
  font-size: 16px;
  font-weight: 200;
`

const Link = styled.a`
  font-size: 12px;
  text-decoration: underline;
  color: #747166;
  cursor: pointer;
  &:hover{
    color: black;
  }
`

const MyProfile = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <Wrapper>
        <TextContainer>
          <Label>Моя анкета</Label>
          <Description>
            Расскажите о себе, своём образовании или опыте работы
          </Description>
          <Link onClick={() => navigate('/my-profiles')}>
            Заполнить/Редактировать
          </Link>
        </TextContainer>
        <Image/>
      </Wrapper>
    </Container>
  )
};

export default MyProfile;
