import React from 'react';
import styled from 'styled-components';
import RoomList from '../components/room/roomList';
import backgroundImage from '../pictures/space-1721695_1920.jpg';
import { useNavigate } from 'react-router-dom';
import Button from '../button';


const StyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;  
  background-image: url(${backgroundImage});  
  background-attachment: fixed; 
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  @media (max-width: 1440px) {
    height: 100vh;
  }
`;

const StyledH2 = styled.h2`
  color: #EDF2F4;
  margin: 8vh;
  text-shadow: 5px 5px 10px #0B025F;
  text-align: center;
  font-size: 3rem;
  font-family: 'Montserrat', sans-serif;
  @media (max-width: 1440px) {
    display: none;
  }
`;

const StyledText = styled.div`
  color: #EDF2F4;
  margin: 1vh;
  text-shadow: 5px 5px 10px #0B025F;
  font-family: 'Lora', serif;
  font-size: 1.5rem;
  text-align: justify;
  width: 1140px;
  padding-left: 150px;
  padding-right: 150px;
  @media (max-width: 1440px) {
    display: none;
  }
`;

const StyledTextInformation = styled.div`
  color: #EDF2F4;
  margin: 1vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-shadow: 5px 5px 10px #0B025F;
  font-family: 'Lora', serif;
  font-size: 1.3rem;
  text-align: justify;
  width: 85vw;
  padding-left: 10px;
  padding-right: 10px;
  @media (max-width: 1440px) {
    gap: 15px;
  }
  @media (min-width: 1440px) {
    display: none;
  }
`;


const RoomPresentation = ({ rooms }) => {

  const navigate = useNavigate();

  const handleEnterClick = () => {
    navigate('/purchase');
  };

  return (
    <StyledWrapper>
      <StyledH2>
        Bienvenue aux portes de notre Hall of Fame
      </StyledH2>
      <StyledText>
      Explorez l'élégance intemporelle de nos différentes salles, chacune dédiée à la célébration unique de personnes. Chaque salle est une pièce précieuse, un espace dédié à la mise en lumière d'individus extraordinaires. Prenez le temps de déambuler à travers ces espaces soigneusement conçus, où l'individualité, la générosité et les liens intergénérationnels s'entrelacent pour créer une expérience visuelle inoubliable.
      </StyledText>

      <RoomList rooms={rooms} />
      <StyledTextInformation>
      Pour apprécier pleinement la beauté de nos salles, nous vous recommandons de visiter notre Hall of Fame sur un écran plus grand, offrant une expérience visuelle optimale (minimum de 1440px). Cependant, vous pouvez tout de même nous rejoindre ici :
        <Button primary onClick={handleEnterClick}>Nos offres</Button>
      </StyledTextInformation>
    </StyledWrapper>
  );
};

export default RoomPresentation;