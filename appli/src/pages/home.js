import React from 'react';
import styled from 'styled-components';
import backgroundImage from '../pictures/space-1721695_1920.jpg';
import subtitleImage from '../pictures/capture.png';
import { useNavigate } from 'react-router-dom';
import Button from '../button';


const StyledWrapper = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center; 
  padding-top: 150px; 
  padding-bottom: 200px;
  background-image: url(${backgroundImage});  
  background-attachment: fixed; 
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

`;

const StyledPresentation = styled.div`
  width: 100vw;
  max-width: 1440px;
  opacity: 0.8;
  background-color: #EDF2F4;
  display: flex;
  flex-direction: column;
  padding: 100px 20px 100px 20px;
  @media (max-width: 767px) {
    padding: 30px 20px 50px 20px;
  }
`;

const StyledH1 = styled.h1`
  color: #972D5C;
  font-size: 4rem;
  text-shadow: 5px 5px 10px grey;
  font-family: 'Montserrat', sans-serif;
  margin-left: 80px;
  @media (max-width: 768px) {
    margin-left: 10px;
    font-size: 2.5rem;
  }
`;

const StyledSubtitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: start;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

`;

const StyledSubtitleTextArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
    @media (max-width: 768px) {
    width: 95%;
  }
`;

const StyledSubtitleText = styled.div`
  width: 100%;
  font-size: 1.4rem;
  text-align: justify;
  font-family: 'Montserrat', sans-serif;
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 2vh;
  }
`;

const StyledSubtitlePictures = styled.img`
  width: 55%;
  @media (max-width: 768px) {
    display: none;
  }
`;


const Home = () => {

  const navigate = useNavigate();

  const handleEnterClick = () => {
    // Utilisez la fonction navigate pour naviguer vers la page RoomPresentation
    navigate('/more');
  };
  return (
 
    <StyledWrapper>
      <StyledPresentation>
        <StyledH1>The Hall of Fame</StyledH1>
        <StyledSubtitleWrapper>
          <StyledSubtitleTextArea>
            <StyledSubtitleText>
              Plongez dans l'éternité visuelle avec Hall of Fame, où chaque pixel raconte une histoire qui perdurera pendant 100 ans. Immortalisez votre héritage visuel et créez une empreinte émotionnelle durable pour les générations futures.
            </StyledSubtitleText>
          <Button primary onClick={handleEnterClick}>En savoir plus</Button>
          </StyledSubtitleTextArea>
          <StyledSubtitlePictures src={subtitleImage} alt="présentation" />
        </StyledSubtitleWrapper>

      </StyledPresentation>
    </StyledWrapper>

  );
};

export default Home;
