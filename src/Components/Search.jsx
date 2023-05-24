import { useState } from "react";
import styled from 'styled-components';
import CreditScoreChart from "./CreditscoreChat";
import Profile from "./Profile";
import axios from "axios";
import BarChart from "./BarChat";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AccountNumberInput = styled.input`
  width: 300px;
  height: 40px;
  background-color: #d9d9d9;
  border: none;
  border-radius: 4px;
  padding: 0 10px;
  margin-left: 10px;
  font-size: 16px;
 
  border: 2px solid ${(props) => (props.isValid ? "green" : "#FFCCCB")};

  @media only screen and (max-width: 768px) {
    width: 100%;
    margin: 10px 0;
  }
`;
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
  padding-bottom: 20px;

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
  bottom: 22%;
  left: 71%;
 

  &:hover {
    background-color: #002984;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;



const Search = ({keyword, setReportData , reportData, saveReportToLocalStorage,setResults }) => {

  const [accoutNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState();
  const [isAccountNumberFocused, setAccountNumberFocused] = useState(false);
 
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [creditScores, setCreditScores] = useState();
const [bank, setBank] = useState("");
const [defaulter, setDefaulter] = useState(false);
const [accountType, setAccountType] = useState("");
const [ capableAmount, setCapableAmount] = useState(null);

const validateAccountNumber = (value) => {
  const accountNumberRegex = /^(?!-)(?:0|[1-9]\d{0,11})?$/;
  
  return accountNumberRegex.test(value);
};

const validateAmount = (value) => {
  const amountRegex = /^(?!-)(?:0|[1-9]\d*)$/;
  
  ; // Matches zero or more digits
  return amountRegex.test(value);
};

const handleAccountNumberChange = (e) => {
  const inputValue = e.target.value;
  if (validateAccountNumber(inputValue)) {
    setAccountNumber(inputValue);
  }
};

const handleAmountChange = (e) => {
  const inputValue = e.target.value;
  if (validateAmount(inputValue) || inputValue === "") {
    setAmount(inputValue);
  }
};
  
const handleAccountNumberFocus = () => {
  setAccountNumberFocused(true);
};

const handleAccountNumberBlur = () => {
  setAccountNumberFocused(false);
};
 
  const checkCreditScore = () => {

    if (accoutNumber.length !== 12) {
      toast.error("Invalid account number");
      return;
    }

    if (!validateAmount(amount)) {
      toast.error("Invalid amount");
      return;
    }
    const userInput = prompt("Enter your key");

    if(userInput === keyword) {
      toast.success("Valid key");
      
      axios
    .post("http://localhost:5215/api/credit_score/score", {
      accountNumber: accoutNumber,
      amount: amount,
    })
    .then((response) => {
      console.log(response.data); 
      const { firstName, lastName, creditScore, bank, defaulter, accountType, suggestedAmount } = response.data;
      setFirstName(firstName);
      setLastName(lastName);
      setCreditScores(creditScore);
      setBank(bank);
      setDefaulter(defaulter);
      setAccountType(accountType);
      setCapableAmount(suggestedAmount);
      setResults(Math.round(creditScore * 100));

      const newReportData = [
        ...reportData,
        {
          firstName,
          lastName,
          creditScore,
          bank,
          defaulter,
          accountType,
          suggestedAmount,
          accoutNumber,
          amount,
          date: new Date().toLocaleDateString(),
        },
      ];

      // Update the report data state variable
      setReportData(newReportData);

      // Save the updated report data to local storage
      saveReportToLocalStorage(newReportData);

    })
    .catch((error) => {
      toast.error("Invalid account number");
      console.error("Error fetching credit score:", error);
    });
    }

    else{
      toast.error("Enter a valid key");
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

        <AccountNumberInput onChange={handleAccountNumberChange} value={accoutNumber} 
        type="text" placeholder="Enter your Account Number"
        onFocus={handleAccountNumberFocus}
        onBlur={handleAccountNumberBlur}
        isFocused={isAccountNumberFocused}
        isValid={accoutNumber.length === 12}
        />
        <SearchInput onChange={handleAmountChange} value={amount} type="number" 
        placeholder="Enter Amount"   isValid={validateAmount(amount) || amount === ""} />
        <SearchButton onClick={checkCreditScore}>Check</SearchButton>

      </div>
    </SearchContainer>
    <ToastContainer />
      <CreditScoreChart creditScores = {creditScores} />
      <Profile firstName={firstName} lastName = {lastName} creditScores = {creditScores} 
      bank = {bank} defaulter = {defaulter} accountType = {accountType} accoutNumber = {accoutNumber}
      capableAmount = {capableAmount}
      />
       <BarChart creditScores = {creditScores} amount={amount} />
    </>
  );
};

export default Search