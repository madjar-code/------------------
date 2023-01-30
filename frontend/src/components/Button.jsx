import React from "react";
import styled from "styled-components";


const ButtonItem = styled.button`
  background-color: #FF7F50;
  height: ${props => props.height};
  width: ${props => props.width};
  color: white;
  border-radius: 100px;
  font-size: 16px;
  cursor: pointer;
`


const Button = ({ text, width='360px', height='46px', handler }) => {
  return (
    <ButtonItem width={width} height={height} onClick={handler}>
      { text }
    </ButtonItem>
  )
};

export default Button;
