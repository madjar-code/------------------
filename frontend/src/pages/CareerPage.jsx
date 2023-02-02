import { useState, useEffect } from 'react';
import styled from 'styled-components'
import APIService from '../API/APIService';

import CenterContainer from '../components/CenterContainer';

import Header from '../components/Header';


const Container = styled.div`
  min-height: 100vh;
  background: url(https://img.freepik.com/free-vector/white-abstract-background_23-2148810113.jpg?w=996&t=st=1675230059~exp=1675230659~hmac=8129915906b8d3bfc283e264c5b5096c651f5c4eeb8644ba86ed8c463fb5885d) center no-repeat fixed;
  background-size: cover;
`


const CareerPage = () => {
  let pageLabel = 'Карьера'
  let [items, setItems] = useState([])

  useEffect(() => {
    APIService.getRecommendationCategories()
    .then(items => {
      let careerArr = items.filter(function(item) {
        return (item.id > 20 && item.id < 30)
      })
      careerArr.map((item) => {
        if (item.title == 'Вакансии'){
          item.url = '/career-vacancies'
        } else if (item.title == 'Тесты'){
          item.url = '/career-tests'
        } else if (item.title == 'Статьи'){
          item.url = '/career-articles'
        }
      })
      setItems(careerArr)
    })
  }, [])

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
