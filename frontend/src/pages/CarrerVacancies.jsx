import styled from 'styled-components'

import image from '../assets/images/CareerVacancies.svg';
import CenterContainer from '../components/CenterContainer';

import Header from '../components/Header';


const Container = styled.div`
  min-height: 100vh;
  background: url(/images/Background.jpg) center no-repeat fixed;
  background-size: cover;
`


const CareerVacancies = () => {
  let pageLabel = 'Вакансии'
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

export default CareerVacancies;
