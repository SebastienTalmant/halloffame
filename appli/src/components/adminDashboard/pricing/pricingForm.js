import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../../button';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  max-width: 512px;
`;

const StyledInput = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 90%;
`;

const PricingForm = ({ onSubmit, initialValues = {}, onClose }) => {
  const [caracteres, setCaracteres] = useState(initialValues.caracteres);
  const [price, setPrice] = useState(initialValues.price);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCaracteres(initialValues.caracteres);
    setPrice(initialValues.price);
  }, [initialValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      onSubmit({ caracteres, price });
      alert('Enregistrement effectué');
      setCaracteres('');
      setPrice('');
    } catch (error) {
      alert(`Erreur lors de l'enregistrement : ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormContainer>
      <StyledInput
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Prix"
          required
          disabled={isLoading}
        />
        <StyledInput
          type="text"
          value={caracteres}
          onChange={(e) => setCaracteres(e.target.value)}
          placeholder="caracteres"
          required
          disabled={isLoading}
        />

        <Button primary type="submit" disabled={isLoading}>
          Enregistrer
        </Button>
        <Button onClick={onClose} disabled={isLoading}>
          Annuler
        </Button>
      </FormContainer>
    </form>
  );
};

export default PricingForm;
