import React, { useState } from "react";
import axios from "axios";
import backgroundimage from "../../images/loginOne.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const SideDiv = styled.div`
  min-height: 100vh;
  width: 30%;
  background-image: url(${backgroundimage});
  background-size: cover;
`;

const MainContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #D9D9D9;
`;

const FormContainer = styled.div`
  width: 70%;
  max-width: 600px;
  margin: auto;
  background-color: #00305E;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  .file-input {
    display: flex;
    align-items: flex-start;
    
  }

  .file-input Input {
    width: 80%;
    padding-left: 20px;
  }

  .file-input label {
    display: flex;
  
    color: #F4F4F4;
    font-weight: bold;
    padding-right: 30px;
  }
`;

const Input = styled.input`
  background-color: ${(props) => props.inputBgColor || "#f4f4f4"};
  color: black;
  border-radius: 4px;
  padding-left: 10px;
  text-align: left;
  width: 85%;
  height: 40px;
  outline: none;
`;

const Button = styled.button`
  background-color: #E0AF0D;
  color: "#3E5248";
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  width: 87%;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: gold;
  }
`;

const SignUp = ({setKeyword,keyword}) => {
  const [signUpData, setSignUpData] = useState({
    compName: "",
    confirmPassword: "",
    email: "",
    password: "",
    businessLicense: "",
    registrationNumber: "",
    service: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });

    if (name === "confirmPassword" && value === signUpData.password) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:5187/api/register", {
        clientName: signUpData.compName,
        email: signUpData.email,
        password: signUpData.password,
      });

      toast.success('Registration successful');
      //toast.info(`Posted data: ${JSON.stringify(response.data)}`);

      const userInput = prompt(`API Key: ${JSON.stringify(response.data)}\nEnter a Key Word`);

      localStorage.setItem('userInput', userInput);
     
      if(userInput){
      toast.info("Keyword Posted Successfully");

      
      setTimeout(() => {
        const storedUserInput = localStorage.getItem('userInput');
        setKeyword(storedUserInput);
        console.log(keyword);
        navigate("/login");
      }, 3000);
      
    }
      // if (userInput) {
      //   try {
      //     const response = await axios.post("https://api.example.com/endpoint", { value: userInput });
      //     console.log(response.data);
      //   } catch (error) {
      //     toast.error(`${userInput}`);
      //     console.error(error);
      //   }
      // }

      console.log(response.data);
    } catch (error) {
      // Show the prompt for user input
      

      toast.error('Registration failed');
      console.error(error);
    }
  };

  const passwordInputStyle = {
    inputBgColor: passwordMatch ? "lightgreen" : "white",
  };

  const confirmPasswordInputStyle = {
    inputBgColor: passwordMatch ? "lightgreen" : "white",
  };

  return (
    <div>
      <MainContainer>
        <SideDiv className="sideDiv" />
        <FormContainer>
          <h1 style={{ color:"white", textAlign: "center", marginBottom: "20px" }}>Sign Up for Your Account</h1>
          <Form>
            <Input
              value={signUpData.compName}
              type="text"
              placeholder="Company Name"
              id="compName"
              name="compName"
              onChange={handleChange}
            />

            <Input
              value={signUpData.email}
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              onChange={handleChange}
            />

        <div className="file-input">
          <label htmlFor="businessLicense">Upload a Copy of Your License :</label>
          <Input
            type="file"
            id="businessLicense"
            name="businessLicense"
           
            accept="image/*" // Specify accepted file types if needed
          />
        </div>

        <Input
        
          type="text"
          placeholder="Business Registration Number"
          id="registrationNumber"
          name="registrationNumber"
          
        />

        <Input
          
          type="text"
          placeholder="Service"
          id="service"
          name="service"
         
        />

            <Input
              style={passwordInputStyle}
              value={signUpData.password}
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              onChange={handleChange}
            />

            <Input
              style={confirmPasswordInputStyle}
              value={signUpData.confirmPassword}
              placeholder="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={handleChange}
            />

            <Button disabled={!passwordMatch} onClick={handleSubmit}>
              SIGN UP
            </Button>
          </Form>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <p style={{ color:"white"}}>Already have an account? <Link style={{ color:"white"}} to="/login">Sign In</Link></p>
          </div>
        </FormContainer>
      </MainContainer>

      <ToastContainer />
    </div>
  );
};

export default SignUp;
