import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

import image1 from '../assets/images/Career1.svg';
import image2 from '../assets/images/Career2.svg';
import image3 from '../assets/images/Career3.svg';
import CenterContainer from '../components/CenterContainer';

import Header from '../components/Header';


const Container = styled.div`
  min-height: 100vh;
  background: url(https://img.freepik.com/free-vector/white-abstract-background_23-2148810113.jpg?w=996&t=st=1675230059~exp=1675230659~hmac=8129915906b8d3bfc283e264c5b5096c651f5c4eeb8644ba86ed8c463fb5885d) center no-repeat fixed;
  background-size: cover;
`


const CareerPage = () => {
  let pageLabel = 'Карьера'
  let [items, setItems] = useState(
    [{
      id: 1,
      image: image1,
      title: 'Вакансии',
      description: 'Описание',
      url: '/career-vacancies'
    },
    {
      id: 2,
      image: image2,
      title: 'Тесты',
      description: 'Описание',
      url: '/career-tests'
    },
    {
      id: 3,
      image: image3,
      title: 'Статьи',
      description: 'Описание',
      url: '/career-articles'
    }]
  )

  return (
    <Container>
      <Header settings={false}/>
      <CenterContainer
        items={items}
        pageLabel={pageLabel}/>      
    </Container>
  )
};

export default CareerPage;
