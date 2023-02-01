import React from "react";
import styled from 'styled-components'
import image from '../../assets/images/PA2.svg'
// import { ReactComponent as Image } from "../../assets/images/PA2.svg";

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
  padding-top: 12px;
  display: grid;
  grid-template-columns: 207px 1fr;
`

const TextContainer = styled.div`
  width: 210px;
  display: grid;
  grid-template-rows: 70px  95px 1fr;
`

const Label = styled.h2`
  font-size: 26px;
  line-height: 26px;
`

const Description = styled.div`
  font-size: 16px;
  font-weight: 200;
`

const Image = styled.img`
`

const Link = styled.a`
  font-size: 12px;
  text-decoration: underline;
  color: #747166;

  &:hover {
    color: black;
    cursor: pointer;
  }
`

const CareerRoutes = () => {
  return (
    <Container>
      <Wrapper>
        <TextContainer>
          <Label>Карьерный маршрут</Label>
          <Description>
            Постройте карьерные маршруты,
            которые подойдут именно Вам
          </Description>
          <Link href="my-routes">
            Открыть
          </Link>
        </TextContainer>
        <Image src={image}/>
      </Wrapper>
    </Container>
  )
};

export default CareerRoutes;
