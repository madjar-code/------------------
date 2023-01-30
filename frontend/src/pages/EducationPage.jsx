import styled from 'styled-components'

import image1 from '../assets/images/Education1.svg';
import image2 from '../assets/images/Education2.svg';
import image3 from '../assets/images/Education3.svg';
import CenterContainer from '../components/CenterContainer';

import Header from '../components/Header';


const Container = styled.div`
  min-height: 100vh;
  background: url(/images/Background.jpg) center no-repeat fixed;
  background-size: cover;
`


const EducationPage = () => {
  let pageLabel = 'Образование'
  let items = [
    {
      id: 1,
      image: image1,
      title: 'Курсы',
      description: 'Описание',
      url: '/edu-courses'
    },
    {
      id: 2,
      image: image2,
      title: 'Тесты',
      description: 'Описание',
      url: '/edu-tests'
    },
    {
      id: 3,
      image: image3,
      title: 'Статьи',
      description: 'Описание',
      url: '/edu-articles'
    }
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

export default EducationPage;
