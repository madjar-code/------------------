import React from "react";
import styled from 'styled-components'

import image from '../assets/images/ask.jpg'
import image2 from '../assets/images/ask2.jpg'
import Button from "../components/Button";

import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";


const Container = styled.div`
  min-height: 100vh;
  background: url(https://img.freepik.com/free-vector/white-abstract-background_23-2148810113.jpg?w=996&t=st=1675230059~exp=1675230659~hmac=8129915906b8d3bfc283e264c5b5096c651f5c4eeb8644ba86ed8c463fb5885d) center no-repeat fixed;
  background-size: cover;
`

const Wrapper = styled.div`
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
`

const AskBlock = styled.div`
  align-self: center;
  background-color: white;
  border-radius: 20px;
  width: 886px;
  height: 654px;
  display: grid;
  grid-template-columns: 400px 1fr;
`

const Left = styled.div`
  height: 654px;
  display: flex;
  align-items: center;
`

const LeftImage = styled.img`
  margin-left: 20px;
  width: 420px;
  height: 420px;
  object-fit: cover;
`

const Right = styled.div`
  height: 654px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RightImage = styled.img`
  margin-top: 60px;
  width: 80px;
  height: 80px;
  object-fit: cover;
`

const BigLabel = styled.h2`
  margin-top: 11px;
  font-size: 24px;
  font-weight: 600;
`

const SmallLabel = styled.p`
  margin-top: 10px;
  font-size: 20px;
`

const InputWrapper = styled.div`
  margin-top: 22px;
`

const TextAreaWrapper = styled.div`
  margin-top: 12px;
`

const TextArea = styled.textarea`
  width: 327px;
  height: 200px;
  resize: none;
  font-size: 14px;
  border: 1px solid #E5E4E3;
  color: #B3B1B0;
  border-radius: 16px;
  padding-top: 24px;
  padding-left: 24px;
  outline: none;
  ::-webkit-input-placeholder {color:#B3B1B0;}
  :-ms-input-placeholder      {color:#B3B1B0;}

  &:focus {
    color: #FF7F50;
    border-color: #FF7F50;
    ::-webkit-input-placeholder {color:#FF7F50;}
    :-ms-input-placeholder      {color:#FF7F50;}
  }
`

const ButtonWrapper = styled.div`
  margin-top: 20px;
`


const Ask = () => {
  return(
    <Container>
      <Wrapper>
        <AskBlock>
          <Left>
            <LeftImage src={image}/>
          </Left>
          <Right>
            <RightImage src={image2}/>
            <BigLabel>Решим любые вопросы</BigLabel>
            <SmallLabel>Касательно сайта :)</SmallLabel>
            <InputWrapper>
              <Input placeholder='Почта'/>
            </InputWrapper>
            <TextAreaWrapper>
              <TextArea placeholder='Текст'/>
            </TextAreaWrapper>
            <ButtonWrapper>
              <Button text='Отправить' width='327px'/>
            </ButtonWrapper>
            
          </Right>
        </AskBlock>
      </Wrapper>
    </Container>
  )
};

export default Ask;
