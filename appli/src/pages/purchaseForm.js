import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImage from '../pictures/universe-2250310_1920.jpg';
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
  background-color: #EDF2F4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 20px 100px 20px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  @media (max-width: 767px) {
    padding: 30px 20px 50px 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  @media (min-width: 767px) {
    width: 50vw;
  }
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #8D99AE;
  width: 500px;
  font-size: 1.2rem;
  @media (max-width: 767px) {
    width: 75vw;
  }
`;

const StyledTextArea = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #8D99AE;
  width: 500px;
  height: 170px;
  font-size: 1.2rem;
  @media (max-width: 767px) {
    width: 75vw;
  }
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
  width: 1000px;
  height: 555px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border: 3px solid #972D5C;
`;

const StyledContainer = styled.div`
  width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 5px;
`;

const StyledPopupText = styled.div`
  text-align: justify;
  margin: 20px 0 20px 0;
  overflow-y: auto;
  max-height: calc(390px - 30px - 20px);
`;

const StyledPopupTitle = styled.div`
  font-size: 3rem;
  text-shadow: 5px 5px 10px #972D5C;
  position: absolute;
  margin-bottom: 20px;
  top: 30px;
`;

const PurchaseForm = () => {
  const [formData, setFormData] = useState({
    offert_by_name: '',
    offert_by_surname: '',
    name: '',
    surname: '',
    email: '',
    text: '',
    URL: '',
  });

  const [formPreviewData, setFormPreviewData] = useState({
    offert_by_name: '',
    offert_by_surname: '',
    name: '',
    surname: '',
    text: '',
    URL: '',
  });


  const { state } = useLocation();
  const { caseData } = state || {};
  const [maxChars, setMaxChars] = useState(500);
  const [price, setPrice] = useState();


  useEffect(() => {
    const fetchMaxChars = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}api/pricing`);
        const pricingInfo = response.data;
        const pricingEntry = pricingInfo.find(entry => entry.size === caseData.size);

        if (pricingEntry) {
          setMaxChars(pricingEntry.caracteres);
          setPrice(pricingEntry.price)
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des informations de tarification:', error);
      }
    };

    fetchMaxChars();
  }, [caseData.size]);


  const handleSubmit = (e) => {

  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === 'URL') {
      const file = files[0];
  
      // Vérifiez si un fichier a été sélectionné
      if (file) {
        const fileURL = URL.createObjectURL(file);
  
        setFormData((prevData) => ({
          ...prevData,
          URL: file,
        }));
  
        setFormPreviewData((prevData) => ({
          ...prevData,
          URL: fileURL,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
  
      setFormPreviewData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  


  return (
    <StyledWrapper>
      <StyledPurchase>
        {caseData && (
          <>
            <h2>Case: {caseData.id}</h2>

            <Form onSubmit={handleSubmit}>
              Vos informations
              <Input type="text" name="offert_by_name" onChange={handleInputChange} placeholder="Votre nom" required />
              <Input type="text" name="offert_by_surname" onChange={handleInputChange} placeholder="Votre prénom" required />
              <Input type="email" name="email" placeholder="Votre email" required />
              Les informations concernant la personne que vous souhaitez mettre à l'honneur

              <Input type="text" name="name" onChange={handleInputChange} placeholder="Son nom" required />
              <Input type="text" name="surname" onChange={handleInputChange} placeholder="Son prénom" required />

              <StyledTextArea
                name="text"
                placeholder={`Votre message (maximum ${maxChars} caractères)`}
                onChange={handleInputChange}
                maxLength={maxChars}
                required
              />
              Caractères restants : {maxChars - formData.text.length}
              <p> Importez votre photo</p>
              <Input type="file" name="URL" onChange={handleInputChange} accept="image/png, image/jpeg, image/jpg, image/gif" />
              <Button primary type="submit">Payer</Button>
            </Form>
            <PopupContent>
              <StyledContainer>
              <StyledImage src={formPreviewData.URL} alt="Prévisualisation" />

              </StyledContainer>
              <StyledContainer>
                <StyledPopupTitle>{formPreviewData.surname} {formPreviewData.name}</StyledPopupTitle>
                <StyledPopupText>
                  <p>{formPreviewData.text}</p>
                  
                </StyledPopupText>
                <p>Signé : {formPreviewData.offert_by_surname} {formPreviewData.offert_by_name} </p>
              </StyledContainer>
            </PopupContent>

          </>
        )}
      </StyledPurchase>
    </StyledWrapper>
  );
};

export default PurchaseForm;
