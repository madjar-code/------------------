import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import arrow from '../assets/images/TemplateArrow.svg'


const Container = styled.div`
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

const ItemsContainer = styled.div`
`

const Item = styled.div`
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

const Description = styled.p`
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

const BigLabel = styled.h2`
  font-size: 28px;
  padding-bottom:  45px;
  color: #222222;
`

const BackButton = styled.button`
  margin-top: 10px;
  left: 100%;
  margin-left: -120px;
  width: 120px;
  height: 37px;
  background-color: #FF7F50;
  border-radius: 18.5px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  position: relative;
`


const CenterContainer = ({pageLabel, items}) => {
  const navigate = useNavigate()
  return (
    <Container>
      <ItemsContainer>
        <BigLabel>{pageLabel}:</BigLabel>
        {items.map((item, index) =>(
          <Item>
          <Image src={item?.image}/>
          <Title>{item?.title}</Title>
          <Description>{item?.description}</Description>
          <Link src={arrow} onClick={() => navigate(item?.url)}/>
          </Item>
        ))}
      </ItemsContainer>
      <BackButton
        onClick={() => navigate(-1)}
      >
        Назад
      </BackButton>
    </Container>
  )
};

export default CenterContainer;
