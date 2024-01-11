import React from 'react';
import styled from 'styled-components';
import backgroundImage from '../pictures/space-1721695_1920.jpg';
import ContactForm from '../components/form/contactForm';

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
  font-family: 'Montserrat', sans-serif;
`;

const StyledForm = styled.div`
  width: 100vw;
  max-width: 800px;
  opacity: 0.8;
  background-color: #EDF2F4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 20px 100px 20px;
  @media (max-width: 767px) {
    padding: 30px 20px 50px 20px;
  }
`;

const StyledText = styled.div`
  width: 95%;
  font-size: 1.4rem;
  text-align: justify;

  h2 {
    font-size: 2rem;
    margin-top: 20px;
    margin-bottom: 15px;
    text-align: center;
    @media (max-width: 768px) {
        font-size: 1.3rem;
      }
  }

  p {
    margin-bottom: 15px;
    @media (max-width: 768px) {
        font-size: 1rem;
      }
  }

  @media (max-width: 768px) {
    width: 95%;
  }
`;


const Contact = () => {
  return (
    <StyledWrapper>
      <StyledForm>
        <StyledText>
          <h2>Contact</h2>
          <p>Pour toute question, remplissez le formulaire et nous vous répondrons dans les plus brefs délais</p>
        </StyledText>
        <ContactForm />
      </StyledForm>
    </StyledWrapper>
  );
};

export default Contact;
