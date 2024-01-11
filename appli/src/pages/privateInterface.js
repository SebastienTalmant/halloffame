import React, { useContext } from 'react';
import Connection from '../components/connection/authConnection';
import styled from 'styled-components';
import { AuthContext } from '../components/connection/authContext';
import AdminDashboard from '../components/connection/adminDashboard';

const StyledDiv = styled.div`
  background-color: #EDF2F4;
  width: 95vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 80px;
  font-size: 1.2rem;
`;

const PrivateInterface = () => {
  const { isLoggedIn } = useContext(AuthContext);

  
  return (
    <StyledDiv>
      {!isLoggedIn ? (
        <Connection />
      ) : (
            <AdminDashboard /> 
      )}
    </StyledDiv>
  );
};

export default PrivateInterface;
