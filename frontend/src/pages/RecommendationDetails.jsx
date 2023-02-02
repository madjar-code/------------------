import { useState, useEffect } from "react";
import Header from "../components/Header";

import image from '../assets/images/CreateProfile5.svg'
import styled, { css } from 'styled-components'
import { useNavigate, useParams } from "react-router-dom";
import APIService from "../API/APIService";
import ConfirmDeletion from "../components/ConfirmDeletion";


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


const RecommendationDetails = () => {
  const params = useParams()
  const navigate = useNavigate()

  let [PR, setPR] = useState()

  useEffect(() => {
    APIService.getOnePR(params.id)
    .then(data => setPR(data))
  }, [params.id])

  let rawHTML = PR?.html_code
  console.log(PR?.html_code)

  if (!rawHTML){
    rawHTML = '<h4>Нет контента рекомендации</h2>'
  }

  return (
    <Container>
      <Header settings={false}/>
      <CenterContainer>
        <BigLabel>{PR?.title}</BigLabel>

        <ContentContainer>
          <Content dangerouslySetInnerHTML={{ __html: rawHTML }}/>
        </ContentContainer>
        <BackButton
          onClick={() => navigate(-1)}
        >
          Назад
        </BackButton>
      </CenterContainer>

    </Container>
  )
};

export default RecommendationDetails;
