import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Home from './pages/home';
import RoomPresentation from './pages/roomPresentation';
import Purchase from './pages/purchase';
import Contact from './pages/contact';
import FAQ from './pages/FAQ';
import logo from './pictures/logo.png';
import Room from './components/room/room';
import More from './pages/more';
import PrivateInterface from './pages/privateInterface';
import PurchaseForm from './pages/purchaseForm';
import { AuthProvider } from './components/connection/authContext';


const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  transition: top 0.3s;
  z-index: 1;
  transition: transform 1s;
  @media (min-width: 768px) {
    background-color: #972D5C;
  }
`;

const ImageLogo = styled.img`
  height: 60px;
  margin-left: 40px;
  @media (min-width: 768px) {
    height: 80px;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 75%;
  font-family: 'Montserrat', sans-serif;
  background-color: #972D5C;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
  position: absolute;
  top: 0px;
  right: 0;
  font-family: 'Lora', serif;
  font-size: 1.5rem;
  font-weight: bold;
  padding-top: 100px;
  padding-bottom: 100px;
  @media (min-width: 768px) {
    position: static;
    flex-direction: row;
    justify-content: flex-end;
    transform: none;
    font-size: 1.2rem;
    padding-top: 0px;
    padding-bottom: 0px;
  }
`;



const NavLink = styled(Link)`
  position: relative; /* Ajout de cette ligne */
  margin: 0 30px;
  text-decoration: none;
  font-family: 'Lora', sans-serif;
  color: #EDF2F4;
  margin-top: 20px;
  font-size: 1.3rem;

  &:before {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background-color: #EDF2F4;
    transition: width 0.5s;
  }

  &:hover:before {
    width: 100%;
  }

  @media (min-width: 768px) {
    margin-top: 0px;
  }
`;



const BurgerButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  margin-right: 20px;
  @media (min-width: 768px) {
    display: none;
  }
`;

const BurgerLine = styled.div`
  width: 2rem;
  height: 0.25rem;
  background: black;
  border-radius: 10px;
  transition: all 0.3s linear;
  position: relative;
  transform-origin: 1px;

  :first-child {
    transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
  }

  :nth-child(2) {
    opacity: ${({ open }) => open ? '0' : '1'};
  }

  :nth-child(3) {
    transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
  }
`;

const App = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        // Scrolling down
        setTranslateY(-90);
      } else {
        // Scrolling up
        setTranslateY(0);
      }

      setLastScrollTop(scrollTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <AuthProvider>

    <Router>
      <Header style={{ transform: `translateY(${translateY}px)` }}>
        <ImageLogo src={logo} alt="Logo" />
        <BurgerButton open={open} onClick={() => setOpen(!open)}>
          <BurgerLine open={open} />
          <BurgerLine open={open} />
          <BurgerLine open={open} />
        </BurgerButton>
        <Nav open={open}>
          <NavLink to="/" onClick={closeMenu}>
            Accueil
          </NavLink>
          <NavLink to="/roomPresentation" onClick={closeMenu}>
            Les Salles
          </NavLink>
          <NavLink to="/purchase" onClick={closeMenu}>
            Nos offres
          </NavLink>
          <NavLink to="/contact" onClick={closeMenu}>
            Contact
          </NavLink>
          <NavLink to="/faq" onClick={closeMenu}>
            FAQ
          </NavLink>
        </Nav>
      </Header>

      <Routes>
        <Route path="/roomPresentation" element={<RoomPresentation />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/" element={<Home />} />
        <Route path="/roomPresentation/:id" element={<Room />} />
        <Route path="/more" element={<More />} />
        <Route path="/privateInterface" element={<PrivateInterface />} />
        <Route path="/purchaseForm" element={<PurchaseForm />} />
      </Routes>
    </Router>

    </AuthProvider>
  );
};

export default App;