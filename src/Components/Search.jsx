import { useState } from "react";
import styled from 'styled-components';
import {data} from './Data'
import CreditScoreChart from "./CreditscoreChat";
import Profile from "./Profile";
const SearchContainer = styled.div`
  display: flex;
  margin-left: auto;
  position: absolute;
  left: 22%;
  top: 48%;
  background-color: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  flex-direction: column;
  width: 75%;

  @media only screen and (max-width: 768px) {
    margin-left: 40%;
    margin-top: 50px;
    flex-direction: column;
    
    
  }
`;

const SearchInput = styled.input`
  width: 300px;
  height: 40px;
  background-color: #d9d9d9;
  border: none;
  border-radius: 4px;
  padding: 0 10px;
  margin-left: 10px;
  font-size: 16px;
  color: #595959;

  @media only screen and (max-width: 768px) {
    width: 100%;
    margin: 10px 0;
  }
`;

const SearchButton = styled.button`
  background-color: #001965;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  position: absolute;
  bottom: 2%;
  left: 27%;
 

  &:hover {
    background-color: #002984;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;



const Search = () => {

  const [accoutNumber, setAccountNumber] = useState("");
  const [creditscore, setCreditScore] = useState();
  const [Names, setName] = useState("");
  const [accN, setaccN] = useState("");
  const [cScore, setCscore] = useState();
  const SearchAction = (e) => {
    setAccountNumber(e.target.value);
    console.log(data);
  }
  const account = data.find(account => account.accountNo === accoutNumber);
  const checkCreditScore = () => {
   
    console.log(account);  
    if (account) {
      setCreditScore(account.creditScore);
      setName(account.name);
      setaccN(account.accountNo);
      setCscore(account.creditScore);
      setAccountNumber("");
    } else {
      window.alert("Account number not found!");
      setAccountNumber("");
    }
  }
  
  
  return (
    <>
    <SearchContainer>
      <div>
      <span>🔍</span>
        <span>Check Credit Score</span>
        
      </div>
      <div style={{marginTop: '10px'}} >
      <SearchInput onChange={SearchAction} value={accoutNumber} type="text" placeholder="Enter your Account Number" />
      <SearchButton onClick={checkCreditScore}>Verify</SearchButton>
      </div>
    </SearchContainer>
      <CreditScoreChart creditscore = {creditscore} />
      <Profile Names={Names} cScore={cScore} accN = {accN}  />
    </>
  );
};

export default Search