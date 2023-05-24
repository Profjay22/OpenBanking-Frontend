import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Navbar from './Navbars';

const ProfilesContainer = styled.div`
  display: flex;
  height: 100%;
  max-height: 100vh;
  align-items: center;
  justify-content: center;
  
`;

const ContentContainer = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-left: 260px;
  background-color: #D9D9D9;
`;

const ProfileCard = styled(motion.div)`
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

const Label = styled.label`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

const Profiles = () => {
  const [name] = React.useState('Financial Institution');
  const [businessName] = React.useState('Payback Nigeria');
  const [businessRegNumber] = React.useState('1234567890');
  const [email] = React.useState('payback@gmail.com');
  const [phone] = React.useState('08101590149');

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <ProfilesContainer>
      <Navbar />
      <ContentContainer>
        <ProfileCard
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          transition={{ duration: 0.5 }}
        >
          <Label>Service:</Label>
          <Input type="text" value={name} readOnly />

          <Label>Business Name:</Label>
          <Input type="text" value={businessName} readOnly />

          <Label>Business Registration Number:</Label>
          <Input type="text" value={businessRegNumber} readOnly />

          <Label>Email:</Label>
          <Input type="email" value={email} readOnly />

          <Label>Phone:</Label>
          <Input type="tel" value={phone} readOnly />
        </ProfileCard>
      </ContentContainer>
    </ProfilesContainer>
  );
};

export default Profiles;
