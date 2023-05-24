import styled from 'styled-components';
import { Search as SearchIcon, Settings as SettingsIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  background-color: #ffffff;
  padding: 0 32px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  position: absolute;
  top: 13px;
  width: 71%;
  left: 22%;
  z-index: 1;

  @media only screen and (max-width: 768px) {
    padding: 0 16px;
    width: 100%;
    justify-content: center;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media only screen and (max-width: 768px) {
    gap: 4px;
  }
`;

const HomeIcon = styled.div`
  width: 32px;
  height: 32px;
  background-color: #7B7B7B;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    width: 24px;
    height: 24px;
  }
`;

const HomeText = styled.p`
  font-size: 18px;
  color: #7B7B7B;
  font-weight: 500;
  margin: 0;

  @media only screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #7B7B7B;
  border-radius: 4px;
  padding: 8px;

  @media only screen and (max-width: 768px) {
    gap: 4px;
  }
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
  color: #7B7B7B;
  background-color: transparent;
  width: 100%;

  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media only screen and (max-width: 768px) {
    gap: 8px;
  }
`;



const TopContainer = () => {
  return (
    <Container>
      <LeftContainer>
        <HomeIcon><HomeOutlinedIcon/></HomeIcon>
        <HomeText>Home</HomeText>
      </LeftContainer>
      <SearchContainer>
        <SearchIcon />
        <SearchInput placeholder="Search" />
      </SearchContainer>
      <RightContainer>
        <SettingsIcon style={{ color: '#7B7B7B' }} />
       
        <Link to="/profile" >
        <AccountCircleIcon style={{ color: '#7B7B7B' }} />
        </Link>
      </RightContainer>
    </Container>
  );
};

export default TopContainer;
