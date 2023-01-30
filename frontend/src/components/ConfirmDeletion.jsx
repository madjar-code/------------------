import React from "react";
import image from '../assets/images/MyProfiles3.svg'
import image2 from '../assets/images/CloseIcon.svg'
import styled from 'styled-components'


const Background = styled.div`
  background-color: rgba(241, 241, 241, 0.8);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Block = styled.div`
  position: relative;
  width: 527px;
  height: 528px;
  border-radius: 15px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CloseButton = styled.img`
  position: absolute;
  right: 25px;
  top: 18px;
  cursor: pointer;
  width: 30px;
`

const BigLabel = styled.h3`
  width: 325px;
  text-align: center;
  margin-top: 50px;
  color: #3D3B39;
`

const Image = styled.img`
  margin-top: -10px;
`

const SmallLabel = styled.p`
  font-size: 17px;
  font-weight: 600;
  margin-top: -10px;
`

const ConfirmButton = styled.button`
  margin-top: 21px;
  width: 442px;
  height: 46px;
  background-color: #FF7F50;
  border-radius: 23px;
  color: white;
  font-size: 18px;
  cursor: pointer;
  position: relative;
`


const ConfirmDeletion = ({ handleClose, handleDelete }) => {

  return (
    <Background>
      <Block>
        <CloseButton
          src={image2}
          onClick={handleClose}
        />
        <BigLabel>
          Вы действительно хотите удалить "Название"?
        </BigLabel>
        <Image src={image}/>
        <SmallLabel>
          Восстановить не получится!
        </SmallLabel>
        <ConfirmButton 
          onClick={() => {
            setInterval(() => handleDelete(), 1500)
          }}>
          Подтвердить
        </ConfirmButton>
      </Block>
    </Background>
  )
};

export default ConfirmDeletion;
