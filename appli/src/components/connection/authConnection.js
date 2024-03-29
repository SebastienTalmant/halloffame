import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './authContext';
import Button from '../../button';
import styled from 'styled-components';
import API_BASE_URL from '../../apiConfig';

const MemberArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
  width: 100%;
`;

function Connection() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { isLoggedIn, setIsLoggedIn, email, setEmail } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${API_BASE_URL}login`, { email, password }, { crossDomain: true });
      if (response && response.data) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError("Une erreur s'est produite lors de la tentative de connexion.");
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);;
  };

  if (isLoggedIn) {  //Si utilisateur connecté
    return (
      <MemberArea>
        <h2>Espace Membre</h2>
        <Button onClick={handleLogout}>Déconnexion</Button>
      </MemberArea>
    );
  } else { //Si utilisateur non connecté
    return (
      <div>
        <h1>Formulaire de connexion</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <Button primary type="submit">Connexion</Button>
        </form>
        {error && <p>{error}</p>}
      </div>
    );
  }
}
export default Connection;
