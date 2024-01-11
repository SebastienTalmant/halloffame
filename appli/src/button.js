import styled from 'styled-components';

const Button = styled.button`
  border-radius: 5px;
  padding: 0.5rem 1rem;
  width: 240px;
  margin: 3vw;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Lora';
  font-size: 1.6rem;
  background: ${props => props.primary ? '#972D5C' : '#EF233C'};
  color: #EDF2F4;
  border: 1px solid #EDF2F4;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    background: ${props => props.primary ? '#66183b' : '#D80032'};
  }
  @media (max-width: 767px) {
    font-size: 1rem;
    padding: 0.4rem 0.8rem;
    margin: 0 0.3rem;
    width: 150px;
  }
`;

export default Button;