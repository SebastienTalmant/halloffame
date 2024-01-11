import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Cube from './cube';
import backgroundImage from '../../pictures/universe-2250310_1920.jpg';
import Button from '../../button';
import API_BASE_URL from '../../apiConfig';

const StyledWrapper = styled.div`
  width: 100vw;
  padding-bottom: 10vh;
  display: flex;
  overflow: hidden;
  font-size: 1.8rem;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed; 
  padding-top: 100px;
`;

const StyledH2 = styled.h2`
  color: #EDF2F4;
  margin: 8vh;
  text-shadow: 5px 5px 10px #0B025F;
  text-align: center;
  font-size: 3rem;
  font-family: 'Montserrat', sans-serif;
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
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  box-shadow: 5px 5px 10px #972D5C;
`;

const PopupContent = styled.div`
  position: relative;
  background-color: #fff;
  padding: 20px;
  width: 1440px;
  height: 800px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border: 3px solid #972D5C;
`;

const StyledContainer = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const StyledPopupText = styled.div`
  text-align: justify;
  margin: 0px 10px 0;
  overflow-y: auto;
  max-height: calc(600px - 30px - 20px);
`;

const StyledPopupTitle = styled.div`
  font-size: 3rem;
  text-shadow: 5px 5px 10px #972D5C;
  position: absolute;
  top: 30px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
`;

const Room = () => {
  const [roomData, setRoomData] = useState(null);
  const [popupContent, setPopupContent] = useState(null);
  const [selectedCaseData, setSelectedCaseData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}api/room/${id}`);
        setRoomData(response.data);
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    };
    fetchRoomData();
  }, [id]);


  const handleCaseClick = (caseData) => {
    setSelectedCaseData(caseData);
    let popupContent;
  
    if (caseData.URL && caseData.statut === 'validate') {
      // Case is available and has a valid URL
      popupContent = (
        <PopupContainer onClick={(e) => {
          if (e.target.tagName.toLowerCase() === 'button') {
            setPopupContent(null);
          }
        }}>
          <PopupContent>
            <StyledContainer>
              <StyledImage src={caseData.URL} alt="Popup Content" />
            </StyledContainer>
            <StyledContainer>
              <StyledPopupTitle>{caseData.surname} {caseData.name}</StyledPopupTitle>
              <StyledPopupText>
                <p>{caseData.text}</p>
                <p>Signé : {caseData.offert_by_surname} {caseData.offert_by_name} </p>
              </StyledPopupText>
              <ButtonContainer>
                <Button primary onClick={() => setPopupContent(null)}>Fermer</Button>
              </ButtonContainer>
            </StyledContainer>
          </PopupContent>
        </PopupContainer>
      );
    } else {
      const buttonText = caseData.URL ? 'Fermer' : 'Acheter';

      const onClickHandler = caseData.URL
      ? () => setPopupContent(null)
      : () => {
        navigate('/purchaseForm', { state: { caseId: caseData.id, size: caseData.size } });
      };
  
      const message = caseData.URL
        ? 'Emplacement non disponible'
        : 'Emplacement disponible. Rejoignez nous';
  
      popupContent = (
        <PopupContainer onClick={(e) => {
          if (e.target.tagName.toLowerCase() === 'button') {
            onClickHandler();
          }
        }}>
          <PopupContent>
            <p>{message}</p>
            <ButtonContainer>
              <Button primary onClick={onClickHandler}>{buttonText}</Button>
              {!caseData.URL && <Button primary onClick={() => setPopupContent(null)}>Fermer</Button>}
            </ButtonContainer>
          </PopupContent>
        </PopupContainer>
      );
    }
  
    setPopupContent(popupContent);
  };
  
 


  return (
    <StyledWrapper>

      <StyledH2>Bienvenue dans la salle, où l'on honore {roomData?.title},</StyledH2>
      <StyledText>{roomData?.description}</StyledText>
      <Link to="/roomPresentation" style={{ textDecoration: 'none' }}>
        <Button primary>Sortir de la salle</Button>
      </Link>
      {popupContent}
      <Cube onCaseClick={handleCaseClick} roomId={roomData?.id} />
    </StyledWrapper>
  );
};

export default Room;
