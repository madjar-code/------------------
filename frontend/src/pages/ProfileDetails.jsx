import { useState, useEffect } from "react";
import Header from "../components/Header";

import image from '../assets/images/CreateProfile5.svg'
import image2 from '../assets/images/ProfileDetails.svg'
import styled, { css } from 'styled-components'
import { useNavigate, useParams } from "react-router-dom";
import APIService from "../API/APIService";
import ConfirmDeletion from "../components/ConfirmDeletion";


const Container = styled.div`
  min-height: 100vh;
  background: url(/images/Background.jpg) center no-repeat fixed;
  background-size: cover;
`

const CenterContainer = styled.div`
  border-radius: 20px;
  position: relative;
  left: 50%;
  margin-left: -429.5px;
  width: 859px;
  min-height: 100vh;
  background-color: white;
  padding: 58px 110px;
`

const BigLabel = styled.h2`
  font-size: 30px;
  text-align: center;
`

const CloseButton = styled.img`
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
`

const Image = styled.img`
`

const MediumLabel = styled.h4`
  font-size: 18px;
`

const AboutMeContainer = styled.div`
  margin-top: 38px;
  width: 346px;
  height: 206px;
  padding: 15px;
  float: right;
  background-color: #F5F5F5;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.15);
`

const NameSexDateContainer = styled.div`
  margin-top: 21px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

const Name = styled.p`
  font-weight: 500;
  text-align: center;
  font-size: 16px;
`

const Sex = styled.p`
  color: #747166;
  text-align: center;
  font-size: 16px;
`

const Date = styled.p`
  color: #747166;
  text-align: center;
  font-size: 16px;
`

const EmailContainer = styled.div`
  margin-top: 35px;
  font-size: 14px;
  font-weight: 500;
`

const Email = styled.span`
  padding-left: 5px;
  font-weight: 300;
`

const PhoneContainer = styled.div`
  margin-top: 20px;
  font-size: 14px;
  font-weight: 500;
`

const Phone = styled.span`
  padding-left: 5px;
  font-weight: 300;
`

const EduContainer = styled.div`
  margin-top: 16px;
  height: 175px;
  background-color: #F5F5F5;
  padding: 15px;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.15);
`

const UniversityContainer = styled.div`
  margin-top: 15px;
  font-size: 14px;
  font-weight: 500;
`

const University = styled.span`
  padding-left: 5px;
  font-weight: 300;
`

const LevelFromToContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 15px;
  font-size: 14px;
  font-weight: 500;
`

const LevelContainer = styled.div`
`

const Level = styled.span`
  padding-left: 5px;
  font-weight: 300;
`

const FromContainer = styled.div`
`

const From = styled.span`
  padding-left: 5px;
  font-weight: 300;
`

const ToContainer = styled.div`
`

const To = styled.span`
  padding-left: 5px;
  font-weight: 300;
`

const FacultyContainer = styled.div`
  margin-top: 15px;
  font-size: 14px;
  font-weight: 500;
`

const Faculty = styled.span`
  padding-left: 5px;
  font-weight: 300;
`

const SpecialityContainer = styled.div`
  margin-top: 15px;
  font-size: 14px;
  font-weight: 500;
`

const Speciality = styled.span`
  padding-left: 5px;
  font-weight: 300;
`

const CareerContainer = styled.div`
  margin-top: 28px;
  height: 138px;
  background-color: #F5F5F5;
  padding: 15px;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.15);
`

const CompanyContainer = styled.div`
  margin-top: 15px;
  font-size: 14px;
  font-weight: 500;
`

const Company = styled.span`
  padding-left: 5px;
  font-weight: 300;
`

const PositionFromToContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  margin-top: 15px;
  font-size: 14px;
  font-weight: 500;
`

const PositionContainer = styled.div`
`

const Position = styled.span`
  padding-left: 5px;
  font-weight: 300;
`

const ButtonWrapper = styled.div`  
`

const ButtonStyles = css`
  width: 547px;
  height: 46px;
  border-radius: 23px;
  background-color: #FF7F50;
  color: white;
  cursor: pointer;
`

const ShareButton = styled.button`
  position: relative;
  left: 50%;
  margin-left: -273.5px;
  margin-top: 30px;
  ${ButtonStyles};
`

const DeleteButton = styled.button`
  position: relative;
  left: 50%;
  margin-left: -273.5px;
  margin-top: 15px;
  ${ButtonStyles}
`


const ProfileDetails = () => {
  const params = useParams()
  const navigate = useNavigate()

  let [profile, setProfile] = useState()
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    APIService.getOneProfile(params.id)
    .then(data => setProfile(data))
  }, [params.id])

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleDelete = () => {
    APIService.deleteCV(profile?.id)
    handleCloseModal()
    navigate('/my-profiles')
  }

  let first_education = profile?.educations[0]
  let first_career = profile?.jobs[0]

  let full_name;
  if ( profile?.first_name != '' || profile?.last_name != ''){
    full_name = profile?.first_name + ' ' + profile?.last_name
  } else {
    full_name = 'Имя и фамилия не указаны'
  }

  return (
    <Container>
      {
        openModal
      ? 
        <ConfirmDeletion handleClose={handleCloseModal} handleDelete={handleDelete}/>
      :
        <></>
      }
      <Header settings={false}/>
      <CenterContainer>
        <BigLabel>{profile?.title}</BigLabel>
        <Image src={image2}/>
        <AboutMeContainer>
          <MediumLabel>Обо мне</MediumLabel>
          <NameSexDateContainer>
            <Name>{full_name}</Name>
            <Sex>{profile?.sex}</Sex>
            <Date>{profile?.birthday}</Date>
          </NameSexDateContainer>
          <EmailContainer>
            Почта:<Email>{profile?.contact_email}</Email>
          </EmailContainer>
          <PhoneContainer>
            Телефон:<Phone>{profile?.contact_phone}</Phone>
          </PhoneContainer>
        </AboutMeContainer>

        <EduContainer>
          <MediumLabel>Мое образование</MediumLabel>
          <UniversityContainer>
            Учебное заведение: <University>{ first_education?.university}</University>
          </UniversityContainer>
          <LevelFromToContainer>
            <LevelContainer>
              Степень:<Level>{first_education?.level}</Level>
            </LevelContainer>
            <FromContainer>
              С:<From>{first_education?.start_year}</From>
            </FromContainer>
            <ToContainer>
              По:<To>
                {
                  first_education?.until_now_flag
                  ? 'по настоящее время' 
                  : first_education?.end_year
                }</To>
            </ToContainer>
          </LevelFromToContainer>
          <FacultyContainer>
            Факультет:<Faculty>{first_education?.faculty}</Faculty>
          </FacultyContainer>
          <SpecialityContainer>
            Специальность:<Speciality>{first_education?.speciality}</Speciality>
          </SpecialityContainer>
        </EduContainer>

        <CareerContainer>
          <MediumLabel>Моя карьера</MediumLabel>
          <CompanyContainer>
            Компания:<Company>{first_career?.company}</Company>
          </CompanyContainer>
          <PositionFromToContainer>
            <PositionContainer>
              Должность:<Position>{first_career?.position}</Position>
            </PositionContainer>
            <FromContainer>
              C:<From>{first_career?.start_date}</From>
            </FromContainer>
            <ToContainer>
              По:<To>
                {
                  first_career?.until_now_flag
                  ? 'по настоящее время' 
                  : first_career?.end_date
                }</To>
            </ToContainer>
          </PositionFromToContainer>
        </CareerContainer>
        <ButtonWrapper>
          <ShareButton>Поделиться</ShareButton>
        </ButtonWrapper>
        <ButtonWrapper>
          <DeleteButton onClick={() => setOpenModal(true)}>Удалить</DeleteButton>
        </ButtonWrapper>
        <CloseButton
          src={image}
          onClick={() => navigate('/my-profiles')}
        />
      </CenterContainer>
    </Container>
  )
};

export default ProfileDetails;
