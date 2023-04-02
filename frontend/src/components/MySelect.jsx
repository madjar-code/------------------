import { useState } from "react";
import styled from "styled-components";
import arrow from '../assets/images/selectIcon.svg';
import arrow2 from '../assets/images/selectIcon2.svg'


const MySelect = ({ listName, items, selectedItem, setSelectedItem }) => {
  let [open, setOpen] = useState(false)
  let [placeholder, setPlaceholder] = useState('Выберите из списка')

  return (
    <Container>
      {
      open
      ?
        <OpenBlock>
          <CloseIcon
            src={arrow}
            onClick={() => setOpen(false)}
          />
          <List>
            <FirstItem textDecoration={selectedItem ? 'none' : 'underline'}>
              {listName}
            </FirstItem>
            {items.map((item, id) => {
              let textDecoration = 'none'
              selectedItem?.title == item?.title ? textDecoration = 'underline' : textDecoration = 'none'
              return(
              <Item
                key={id}
                onClick={() => {
                  setSelectedItem(item)
                  setPlaceholder(item.title)
                  setOpen(false)}}
                textDecoration={textDecoration}
                >
                  {item?.title}</Item>)})}
          </List>
        </OpenBlock>
      :
        <CloseBlock>
          <OpenIcon
            src={arrow2}
            onClick={() => setOpen(true)}
          />
          <Placeholder
            onClick={() => setOpen(true)}
            >
            {placeholder}
          </Placeholder>
        </CloseBlock>
      }
    </Container>
  )
  
};

export default MySelect;



const Container = styled.div`
  position: relative;
  width: 451px;
  height: 38px;
  /* background-color: red; */
`

const OpenBlock = styled.div`
  left: 0;
  position: absolute;
  width: 451px;
  border-radius: 25px;
  border: 1.5px solid #FF7F50;
  background-color: white;
  padding: 10px 15px;
  z-index: 10;
`

const List = styled.ul`
  color: #FF7F50;
  font-size: 14px;
`

const CloseIcon = styled.img`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
`

const FirstItem = styled.li`
  text-decoration: ${(props) => props.textDecoration};
`

const Item = styled.li`
  margin-top: 13px;
  cursor: pointer;
  text-decoration: ${(props) => props.textDecoration};
  &:hover {
    text-decoration: underline;
  }
`

const CloseBlock = styled.div`
  position: relative;
  width: 451px;
  height: 38px;
  border-radius: 15px;
  border: 1.5px solid #E5E4E3;
  background-color: white;
  padding: 10px 13px;
`

const Placeholder = styled.p`
  font-size: 14px;
  color: #C3C3C3;
  cursor: pointer;
`

const OpenIcon = styled.img`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
`
