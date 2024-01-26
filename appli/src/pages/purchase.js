import React, { useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import backgroundImage from '../pictures/space-1721695_1920.jpg';
import { useNavigate } from 'react-router-dom';
import Button from '../button';
import API_BASE_URL from '../apiConfig';



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
  @media (max-width: 767px) {
   flex-direction: column;
   justify-content: center;
   align-items: center;
   text-align: justify;
  }
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
  const [pricingData, setPricingData] = useState([]);

  useEffect(() => {
    const fetchPricingData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}api/pricing`);
        setPricingData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de tarification:', error);
      }
    };
  
    fetchPricingData();
  }, []);
  

  const navigate = useNavigate();

  const handleEnterClick = () => {
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
        <SelectWrapper>
  {pricingData.map(option => (
    <OptionContainer key={option.id}>
      <ImagePlaceholder size={option.size} />
      <OptionDescription>
        <span>Message : {option.caracteres} caractères</span>
        <span>Taille : {option.size}px</span>
        <h4>Prix : {option.price}€</h4>
      </OptionDescription>
    </OptionContainer>
  ))}
</SelectWrapper>

        </SelectWrapper>
      </StyledPurchase>
    </StyledWrapper>
  );
};



export default Purchase;
