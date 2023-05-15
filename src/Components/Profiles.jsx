import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbars';

const ProfilesContainer = styled.div`
  display: flex;
  height: 100%;
  max-height: 100vh;

`;


const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const ProfileCard = styled.div`
  width: 80%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  @media screen and (min-width: 768px) {
    width: 60%;
    padding: 50px;
  }
`;

// const Title = styled.h1`
//   font-size: 32px;
//   margin: 0;
//   margin-bottom: 20px;
//   text-align: center;
// `;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

// const Button = styled.button`
//   background-color: #001965;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   padding: 10px 20px;
//   font-size: 18px;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #384b70;
//   }
// `;

const Profiles = () => {
  const [name, setName] = React.useState('John Doe');
  const [businessName, setBusinessName] = React.useState('ABC Corporation');
  const [businessRegNumber, setBusinessRegNumber] = React.useState('1234567890');
  const [email, setEmail] = React.useState('johndoe@example.com');
  const [phone, setPhone] = React.useState('123-456-7890');

  return (
    <ProfilesContainer>
      <Navbar />
      <ContentContainer>
        <ProfileCard>
    
          <Label>Name:</Label>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)}  readOnly />
          <Label>Business Name:</Label>
          <Input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)}  readOnly />
          <Label>Business Registration Number:</Label>
          <Input type="text" value={businessRegNumber} onChange={(e) => setBusinessRegNumber(e.target.value)}  readOnly />
          <Label>Email:</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  readOnly/>
            <Label>Phone:</Label>
            <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}  readOnly />
           
            </ProfileCard>
            </ContentContainer>
    </ProfilesContainer>    
);
};

export default Profiles;