import React from 'react';
import styled from 'styled-components';

const StyledCase = styled.div`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border: 1px solid #972D5C;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  background-color: #EDF2FA;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Case = ({ size, photo, onCaseClick, message, name, surname, offertByName, offertBySurname, statut, id }) => {
  const handleCaseClick = (event) => {
    event.stopPropagation();
    onCaseClick({ photo, message, name, surname, offertByName, offertBySurname, statut, id });
  };

  return (
    <StyledCase size={size} onClick={handleCaseClick} style={{ opacity: photo ? 1 : 0.6 }}>
      {photo && statut === 'validate' && (
        <img src={photo} alt="Case Content" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </StyledCase>
  );
};

export default Case;