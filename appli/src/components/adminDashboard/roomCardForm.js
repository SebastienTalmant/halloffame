import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../button';

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

const StyledTextarea = styled.textarea`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 90%;
  resize: vertical;
`;

const RoomCardForm = ({ onSubmit, initialValues = {}, onClose }) => {
  const [name, setName] = useState(initialValues.name || '');
  const [title, setTitle] = useState(initialValues.title || '');
  const [description, setDescription] = useState(initialValues.description || '');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setName(initialValues.name || '');
    setTitle(initialValues.title || '');
    setDescription(initialValues.description || '');
  }, [initialValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      onSubmit({ name, title, description });
      alert('Enregistrement effectué');
      setName('');
      setTitle('');
      setDescription('');
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom"
          required
          disabled={isLoading}
        />
        <StyledInput
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Sous-titre"
          required
          disabled={isLoading}
        />
        <StyledTextarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
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

export default RoomCardForm;
