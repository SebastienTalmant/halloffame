import React, { useRef } from 'react';
import styled from 'styled-components';
import Button from '../../button';
import emailjs from '@emailjs/browser';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  @media (min-width: 767px) {
    width: 35vw;
  }
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #8D99AE;
  width: 500px;
  @media (max-width: 767px) {
    width: 75vw;
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #8D99AE;
  width: 500px;
  @media (max-width: 767px) {
    width: 75vw;
  }
`;


const ContactForm = () => {
    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_rcrbugr', 'template_h2minki', form.current, 'LHT6r6aH0K0UZiBWK')
        .then((result) => {
            console.log(result.text);
            alert('Votre message a bien été envoyé !');
            form.current.reset(); // Réinitialiser le formulaire
          }, (error) => {
            console.log(error.text);
            alert('Une erreur est survenue lors de l\'envoi de votre message.');
          });
    };
    return (
      <Form ref={form} onSubmit={sendEmail}>
        <Input type="text" name="sujet" placeholder="Sujet" required />
        <Input type="text" name="nom" placeholder="Votre nom"  required />
        <Input type="email" name="email" placeholder="Votre email" required />
        <Input type="tel" name="telephone" placeholder="Votre téléphone" required />
        <Textarea rows="5" name="message" placeholder="Votre message"  required></Textarea>
        <Button primary type="submit">Envoyer</Button>
      </Form>
    );
  };
  
  export default ContactForm;