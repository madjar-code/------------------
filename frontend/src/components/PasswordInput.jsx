import React from "react";

import styled from 'styled-components'


const InputItem = styled.input`
  width: 327px;
  height: 60px;
  font-size: 14px;
  border: 1px solid #E5E4E3;
  color: #E5E4E3;
  border-radius: 16px;
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


const PasswordInput = ({ placeholder='Пароль', onChange }) => {
  return <InputItem placeholder={placeholder} onChange={onChange} type="password"/>
};

export default PasswordInput;
