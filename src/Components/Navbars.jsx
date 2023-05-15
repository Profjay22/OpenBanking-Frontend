import React from 'react';
import styled from 'styled-components';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import { Link, useLocation } from "react-router-dom";

const NavbarContainer = styled.div`
  background-color: #001965;
  width: 25%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  @media screen and (min-width: 768px) {
    width: 18%;
    height: 105vh;
    flex-direction: column;
    justify-content: space-between;
   
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-decoration: none;
  margin: 0;
`;


const LinkList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  @media screen and (min-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const LinkItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  color: ${(props) => props.active ? '#001965' : 'white'};
  font-size: 18px;
  cursor: pointer;
  
  background-color: ${(props) => props.active ? '#FFC107' : 'transparent'};
  &:hover {
    background-color: #384B70;
  }

  @media screen and (min-width: 768px) {
    padding: 10px 20px;
    text-decoration: none;
  }
`;


const IconWrapper = styled.span`
  margin-right: 10px;
`;

const HamburgerIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const Footer = styled.div`
  color: white;
  font-size: 14px;
  margin-bottom: 10px;
`;

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const location = useLocation();
    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };
  
    return (
      <NavbarContainer>
        <Header>
          <Title>Open-Banking</Title>
          <HamburgerIcon onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? '✕' : '☰'}
          </HamburgerIcon>
        </Header>
        <LinkList style={{display: isMobileMenuOpen ? 'flex' : window.innerWidth >= 768 ? 'flex' : 'none'}}>
          <LinkItem active={location.pathname === '/'}>
          <Link to="/"  style={{textDecoration: 'none', color: 'white'}}> 
            <IconWrapper><HomeOutlinedIcon /></IconWrapper>
            Dashboard
            </Link>
          </LinkItem>
          <LinkItem active={location.pathname === '/profile'}>
            <Link to="/profile"  style={{textDecoration: 'none', color: 'white'}}> 
            <IconWrapper><Person2OutlinedIcon /></IconWrapper>
            Profile
            </Link>
           
          </LinkItem>
          <LinkItem>
            <IconWrapper><NotificationsNoneOutlinedIcon /></IconWrapper>
            Notifications
          </LinkItem>
          <LinkItem>
            <IconWrapper><SettingsOutlinedIcon /></IconWrapper>
            Settings
          </LinkItem>
          <LinkItem>
            <IconWrapper><PowerSettingsNewOutlinedIcon /></IconWrapper>
            Logout
          </LinkItem>
        </LinkList>
        <HamburgerIcon style={{display: window.innerWidth >= 768 ? 'none' : 'flex'}} onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </HamburgerIcon>
        <Footer>
          © 2023 Open-Banking. All rights reserved.
        </Footer>
      </NavbarContainer>
    );
  };
  
  export default Navbar