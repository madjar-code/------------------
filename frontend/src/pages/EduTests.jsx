import styled from 'styled-components'

import image from '../assets/images/EduTests.svg';
import CenterContainer from '../components/CenterContainer';

import Header from '../components/Header';


const Container = styled.div`
  min-height: 100vh;
  background: url(https://img.freepik.com/free-vector/white-abstract-background_23-2148810113.jpg?w=996&t=st=1675230059~exp=1675230659~hmac=8129915906b8d3bfc283e264c5b5096c651f5c4eeb8644ba86ed8c463fb5885d) center no-repeat fixed;
  background-size: cover;
`


const EduTests = () => {
  let pageLabel = 'Тесты'
  let items = [
    {
      id: 1,
      image: image,
      title: 'Название',
      description: 'Описание',
    },
    {
      id: 2,
      image: image,
      title: 'Название',
      description: 'Описание',
    },
  ]

  return (
    <Container>
      <Header settings={false}/>
      <CenterContainer
        items={items}
        pageLabel={pageLabel}/>      
    </Container>
  )
};

export default EduTests;
