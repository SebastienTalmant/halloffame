import React from 'react';
import styled from 'styled-components';
import backgroundImage from '../pictures/space-1721695_1920.jpg';


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

const StyledPresentation = styled.div`
  width: 100vw;
  max-width: 1440px;
  opacity: 0.8;
  background-color: #EDF2F4;
  display: flex;
  flex-direction: column;
  padding: 100px 20px 100px 20px; 
  @media (max-width: 767px) {
    padding: 30px 20px 50px 20px;
  }
`;


const StyledSubtitleWrapper = styled.div`
width: 95%;
font-size: 1.4rem;
text-align: justify;

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  @media (max-width: 768px) {
      font-size: 1.8rem;
    }
}

h2 {
  font-size: 2rem;
  margin-top: 20px;
  margin-bottom: 15px;
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





const FAQ = () => {

  return (

    <StyledWrapper>
      <StyledPresentation>
        <StyledSubtitleWrapper>
          <h2>Qu'est-ce que le Hall of Fame ?</h2>
          <p>Le Hall of Fame est une expérience visuelle unique célébrant l'individualité, la générosité et les liens intergénérationnels. Il offre une opportunité exceptionnelle de laisser une trace visuelle qui perdurera pendant 100 ans, contribuant ainsi à une archive visuelle collective.</p>
          <h2>Pour quoi faire le Hall of Fame ?</h2>
          <p>Le Hall of Fame vous permet de créer un héritage numérique, immortaliser des moments clés de votre vie, favoriser la connexion intergénérationnelle et construire un historique personnel visuel évolutif, le tout partageable avec les générations futures.</p>
          <h2>Comment s'inscrire ?</h2>
          <p>Pour vous inscrire, rendez-vous dans la salle de votre choix et cliquez sur l'emplacement libre de votre choix. Remplissez le formulaire et prévisualiser votre cadeau avant paiement.</p>
          <h2>Quand sera affichée ma contribution ?</h2>
          <p>Afin de vérifier que la photo ainsi que le message répondent à nos conditions d'utilisation, votre contribution sera validée dans un délai maximal de 48 heures. Une fois validée, elle sera affichée pour être partagée avec notre communauté. Nous sommes impatients de découvrir et de partager votre histoire !</p><h2>Comment nous contacter ?</h2>
          <p>Pour toute question ou demande, veuillez utiliser notre formulaire de contact disponible sur le site.</p>
          <h2>Combien ça coûte ?</h2>
          <p>Le coût dépend du forfait choisi. Pour plus d'informations détaillées sur nos offres, veuillez consulter la page dédiée "Nos Offres".</p>
          <h2>Les interdictions</h2>
          <p>Il est formellement interdit de mettre des photos ou des messages offensants. Tout non-respect de cette règle entraînera la suppression sans remboursement.</p>
        </StyledSubtitleWrapper>
      </StyledPresentation>
    </StyledWrapper>
  );
};

export default FAQ;
