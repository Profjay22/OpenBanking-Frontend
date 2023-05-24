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
  top: 68%;
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

// const getCreditCheck = (cScore) => {
//     if (cScore >= 0 && cScore <= 49) {
//       return <span style={{ color: "red" }}>Failed</span>;
//     } else if (cScore >= 50 && cScore <= 69) {
//       return <span style={{ color: "#F0BD2D" }}>Average</span>;
//     } else if (cScore >= 70 && cScore <= 100) {
//       return <span style={{ color: "green" }}>Passed</span>;
//     }
//   };

const getDefaulter = (defaults) => {
    if(defaults === true){
      return <span style={{ color: "red"}}> Yes </span>
    }
    else{
      return <span style={{ color: "green" }}>No</span>
    }
}

const Profile = ({firstName, capableAmount ,lastName,creditScores, bank,defaulter,accountType,accoutNumber}) => {
  let result = Math.round(100 * creditScores );  

 // const creditCheck = getCreditCheck(result);
    const defaultCheck = getDefaulter(defaulter);
  return (
    <Wrapper>
      <ProfileTitle>Customer Profile</ProfileTitle>
      <ProfileDetails>
        <DetailItem>FirstName: {firstName}  </DetailItem>
        <DetailItem>LastName: {lastName}  </DetailItem>
        <DetailItem>Account No: {accoutNumber}</DetailItem>
        <DetailItem>Account Type: {accountType}</DetailItem>
        <DetailItem>Bank: {bank}</DetailItem>
        <DetailItem>Defaulted Loan: {defaultCheck}</DetailItem>
       
        {result < 70 && <DetailItem>Capable Amount: ₦{Math.round(capableAmount)}</DetailItem>}
        <DetailItem>Credit Score: {result + "%"}</DetailItem>
      </ProfileDetails>
    </Wrapper>
  );
};

export default Profile;
