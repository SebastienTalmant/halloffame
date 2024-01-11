import React from 'react';
import styled from 'styled-components';
import backgroundImage from '../pictures/space-1721695_1920.jpg';
import { useNavigate } from 'react-router-dom';
import Button from '../button';


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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

`;

const StyledSubtitleText = styled.div`
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




const More = () => {

    const navigate = useNavigate();

    const handleEnterClick = () => {
        // Utilisez la fonction navigate pour naviguer vers la page RoomPresentation
        navigate('/roomPresentation');
    };
    return (

        <StyledWrapper>
            <StyledPresentation>
                <StyledSubtitleWrapper>
                    <StyledSubtitleText>
                        <h1>Bienvenue sur le Hall of Fame</h1> 
                        
                        <p> Découvrez une expérience visuelle unique au Hall of Fame, célébrant les personnes qui nous sont chères. Notre site offre une opportunité exceptionnelle de laisser une trace visuelle qui perdurera pendant 100 ans, contribuant à offrir un message indélébile. Ce message capture l'essence, les valeurs et la positivité de chaque individu, formant un héritage numérique durable. </p> 
                        
                        <h2>Comment Ça Marche :</h2> 
                        
                        <p> Choisissez une salle correspondant au message que vous souhaitez laisser parmi nos thèmes variés, chacun mettant en lumière des qualités spécifiques. Chaque salle a un nombre limité de places, accentuant la rareté et l'unicité de votre message. Les emplacements visuels, disponibles en différentes dimensions (60px, 90px, 120px, 150px), permettent de mettre en avant chaque personne de manière distinctive. En cliquant sur chaque emplacement, les visiteurs peuvent découvrir le message associé à la personne mise en valeur, accompagné d'une photo. </p> 
                        
                        <h2>Créez Votre Héritage Numérique en Rejoignant le Hall of Fame</h2> 
                        
                        <p> Participez à cette expérience unique pour laisser une trace indélébile en ligne, créant ainsi un héritage numérique transcendant les générations futures. Votre contribution devient une pièce précieuse de cette archive visuelle collective, représentant non seulement la personne que vous honorez mais aussi un lien significatif avec le passé et le futur. Chaque photo ouvre une fenêtre sur votre histoire personnelle, capturant la richesse de vos expériences et laissant une empreinte durable dans le Hall of Fame. Les générations futures auront ainsi la chance de découvrir les personnes qui ont façonné votre existence. </p> 
                        
                        <h2>Favorisez la Connexion Intergénérationnelle à Travers des Traces Uniques</h2> 
                        
                        <p> Votre participation ne se limite pas à vous-même ; elle tisse des liens significatifs entre les générations. Les traces visuelles uniques laissées par chaque participant deviennent des ponts entre le passé et le futur, favorisant une connexion rare et précieuse. Les membres de votre famille auront ainsi l'occasion de découvrir visuellement vos contributions, créant une continuité visuelle dans l'histoire familiale. </p> 
                        
                        <h2>Créez un Historique Personnel Visuel Évolutif</h2> 
                        
                        <p> Rejoignez cette aventure unique où votre contribution devient une partie intégrante d'une communauté visuelle exceptionnelle. Ensemble, créons un héritage numérique et visuel précieux, unissant les individus à travers le temps et l'espace. </p> 
                        
                        <h2>Soutenez le Projet :</h2> 
                        
                        <p> Contribuez à cette initiative exceptionnelle, jouant un rôle clé dans la construction de l'archive visuelle pour les générations futures. Soyez parmi les rares à participer à cette exploration de la préservation numérique à long terme. </p> 
                        
                        <h2>Exploration Interactive :</h2> 
                        
                        <p> Offrez aux visiteurs futurs la possibilité d'explorer visuellement des périodes du passé grâce aux images et aux informations laissées par les participants. Votre contribution devient ainsi une fenêtre captivante sur l'histoire pour les générations à venir. </p>

                    </StyledSubtitleText>
                    <Button primary onClick={handleEnterClick}>Voir nos salles</Button>

                </StyledSubtitleWrapper>

            </StyledPresentation>
        </StyledWrapper>

    );
};

export default More;
