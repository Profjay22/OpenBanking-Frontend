import React from 'react';
import styled, { keyframes } from 'styled-components';

const hoverAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
`;

const Wrapper = styled.div`
  background-color: #ffffff;
  padding: 5px;
  width: 36%;
  position: absolute;
  left: 23%;
  bottom: 5%;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    animation: ${hoverAnimation} 1s ease-in-out infinite;
  }
`;

const ProfileTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #595959;
  margin-bottom: 10px;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    width: 60px;
    height: 3px;
    background-color: #595959;
    bottom: -10px;
    left: 0;
  }
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailItem = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #595959;
  
`;

const getCreditCheck = (cScore) => {
    if (cScore >= 0 && cScore <= 40) {
      return <span style={{ color: "red" }}>Failed</span>;
    } else if (cScore >= 41 && cScore <= 69) {
      return <span style={{ color: "#F0BD2D" }}>Average</span>;
    } else if (cScore >= 70 && cScore <= 100) {
      return <span style={{ color: "green" }}>Passed</span>;
    }
  };

const Profile = ({ Names, cScore, accN  }) => {
    const creditCheck = getCreditCheck(cScore);
    
  return (
    <Wrapper>
      <ProfileTitle>Customer Profile</ProfileTitle>
      <ProfileDetails>
        <DetailItem>Name: {Names}  </DetailItem>
        <DetailItem>Account No: {accN}</DetailItem>
        <DetailItem>Credit Score: {cScore + "%"}</DetailItem>
        <DetailItem>Credit Check: {creditCheck}</DetailItem>

      </ProfileDetails>
    </Wrapper>
  );
};

export default Profile;
