import React from 'react';
import styled from 'styled-components';
import backgroundImage from '../pictures/space-1721695_1920.jpg';
import { useNavigate } from 'react-router-dom';
import Button from '../button';



const StyledWrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center; 
  padding-top: 150px; 
  padding-bottom: 200px;
  background-image: url(${backgroundImage});  
  background-attachment: fixed; 
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  min-height: 100vh;
`;

const StyledPurchase = styled.div`
  width: 100vw;
  max-width: 1440px;
  opacity: 0.8;
  background-color: #EDF2F4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 20px 100px 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.4rem;
  @media (max-width: 767px) {
    padding: 30px 20px 50px 20px;
  }
`;


const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: end;
  justify-content: space-around;
`;

const OptionDescription = styled.div`
  font-size: 1.3rem;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const OptionContainer = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const ImagePlaceholder = styled.div`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-color: black;
  opacity: 0.75;
`;


const Purchase = () => {

  const navigate = useNavigate();

  const handleEnterClick = () => {
    // Utilisez la fonction navigate pour naviguer vers la page RoomPresentation
    navigate('/roomPresentation');
  };


  return (
    <StyledWrapper>
      <StyledPurchase >
        <p>Rejoignez notre aventure unique au Hall of Fame en laissant une empreinte visuelle inoubliable.</p>

        <p>Rendez vous dans la salle de votre choix, et cliquez sur la case de votre choix.</p>

        <Button primary onClick={handleEnterClick}>Voir nos salles</Button>

        <p>Voici les différentes tailles que nous proposons.</p>

        <SelectWrapper>
          <OptionContainer>
            <ImagePlaceholder size={60} />
            <OptionDescription>
              <span>Message : 50 mots</span>
              <span>Taille : 60px</span>
              <h4>Prix : 39€</h4>
            </OptionDescription>
          </OptionContainer>

          <OptionContainer>
            <ImagePlaceholder size={90} />

            <OptionDescription>
              <span>Message : 100 mots</span>
              <span>Taille : 90px</span>
              <h4>Prix : 59€</h4>
            </OptionDescription>
          </OptionContainer>

          <OptionContainer>
            <ImagePlaceholder size={120} />

            <OptionDescription>
              <span>Message : 150 mots</span>
              <span>Taille : 120px</span>
              <h4>Prix : 79€</h4>
            </OptionDescription>
          </OptionContainer>

          <OptionContainer>
            <ImagePlaceholder size={150} />

            <OptionDescription>
              <span>Message : 200 mots</span>
              <span>Taille : 150px</span>
              <h4>Prix : 99€</h4>
            </OptionDescription>
          </OptionContainer>

        </SelectWrapper>
      </StyledPurchase>
    </StyledWrapper>
  );
};



export default Purchase;
