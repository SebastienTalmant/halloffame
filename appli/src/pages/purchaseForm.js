import React, { useState } from 'react';
import styled from 'styled-components';
import backgroundImage from '../pictures/universe-2250310_1920.jpg';

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

const StyledTextArea = styled.textarea`
  width: 80%;
  height: 100px;
  margin-bottom: 20px;
`;

const PurchaseForm = (props) => {
  const { state } = props.location || {};
  const { caseId, size } = state || {};
  const [formData, setFormData] = useState({
    offert_by_name: '',
    offert_by_surname: '',
    email: '',
    confirmEmail: '',
    name: '',
    surname: '',
    text: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <StyledWrapper>
      <StyledPurchase>
        <h2>Case: {caseId}</h2>
        <p>Size: {size}</p>
        <form onSubmit={handleSubmit}>
          <label>Votre nom :</label>
          <input type="text" name="offert_by_name" onChange={handleInputChange} required />
          {/* Ajoutez d'autres champs ici... */}
          <StyledTextArea
            name="text"
            placeholder={`Votre message (maximum ${size / 3} mots)`}
            onChange={handleInputChange}
            maxLength={size === 60 ? 50 : size === 90 ? 100 : size === 120 ? 150 : 200}
            required
          />
          {/* Ajoutez les autres champs de texte ici... */}
          <button type="submit">Soumettre</button>
        </form>
      </StyledPurchase>
    </StyledWrapper>
  );
};

export default PurchaseForm;
