import React, { useState } from "react";
import backgroundimage from "../../images/loginOne.jpg";
import styled from "styled-components";
import { authentication } from "../Authentication";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
    background-color:#00305E;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
      width: 90%;
    }
  `;

  const Form = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  `;

  const Input = styled.input`
  background-color: #f4f4f4;
  color: black;
  border-radius: 4px;
  padding-left: 10px;
  text-align: left;
  width: 80%;
  height: 40px;
  outline: none;
`;

  const Button = styled.button`
    background-color: #E0AF0D;
    color: "#3E5248";
    border-radius: 4px;
    padding: 10px 20px;
    width: 82%;
    font-size: 16px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: gold;
    }
  `;

const Login = ({setIsAuthenticated,isAuthenticated}) => {

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsername = (e) => {
    setEmail(e.target.value)
  };

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  

  

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = authentication.find((user) => user.Email === email);
  
    if (user) {
      if (user.password === password) {
          setIsAuthenticated(true); 
          //console.log(isAuthenticated);
          localStorage.setItem("isAuthenticated", isAuthenticated);
          toast.success("Login Successful");
          navigate("/");
       
      } else {
        toast.error("Incorrect password");
      }
    } else {
      toast.error("User not found");
    }
    
  };

  return (
    <div>
      <MainContainer>
        <SideDiv className="sideDiv" />
        <FormContainer>
          <h1 style={{ color:"white", textAlign: "center", marginBottom: "20px" }}>Log in Your Account</h1>
          <Form>
            <Input
            onChange={handleUsername}
            value={email}
            type="email"
            placeholder="Email"
            id="email"
            name="email"
          />
          <Input
            
            value={password}
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            onChange={handlePassword}
            
          />
            <Button onClick={handleSubmit}>Login</Button>
          </Form>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <p > <Link to="/signup" style={{ color:"white"}}>Sign Up</Link></p>
          </div>
        </FormContainer>
      </MainContainer>
      <ToastContainer />
    </div>
  );
};

export default Login;










// import React, { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import {auth} from "../../firebase"
// import styled from "styled-components";
// import backgroundimage from "../../images/loginOne.jpg";
// import '../../index.css';
// import CustomButton from "../reusables/CustomButton";

//  const Login = () => {
//   const [logInData, setLogInData] = useState({
//     regNum: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLogInData({ ...logInData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     signInWithEmailAndPassword(auth,logInData.regNum,logInData.password)
//     .then((userCredendtial) => {
//       console.log(userCredendtial)
      
     
//     }).catch((err) => {console.log(err)})

//     console.log(logInData);
//     setLogInData({ regNum: "", password: "" });
//   };

//   const SideDiv = styled.div`
//   min-height: 100vh;
//   width: 50%;
//   background-image: url(${backgroundimage});
//   background-size: cover;
//   `;

//   return (
//     <div className="flex items-center w-100">
//       <SideDiv className="sideDiv"></SideDiv>
//       <div className="mainDiv flex flex-col items-center h-screen">
//         <div className="h-20 text-4xl mt-4 mb-8">Sign In to your account</div>
//         <div className="flex-1">
//           <form onSubmit={handleSubmit}>
//             <div className="flex items-center flex-col gap-y-8">
//               {/* first input  */}
//               <div className="flex gap-x-4">
//                 <input
//                   className="secondary-bg-color pl-4 text-left rounded-lg mb-2 w-96 h-12"
//                   value={logInData.regNum}
//                   type="text"
//                   placeholder="Registration Number"
//                   id="regNum"
//                   name="regNum"
//                   onChange={handleChange}
//                 />
//               </div>
//               {/* second input  */}
//               <div className="flex gap-x-4">
//                 <input
//                   className="secondary-bg-color pl-4 text-left rounded-lg w-96 h-12"
//                   value={logInData.password}
//                   type="password"
//                   placeholder="Password"
//                   id="password"
//                   name="password"
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="flex gap-x-4 mb-4">
//                 <div className="flex items-center gap-x-2">
//                   {/* <FaSquare className="" /> */}
//                   <input type="checkbox" id="CheckBox" className="" />
//                   Remember Me
//                 </div>
//                 <div>
//                   Forgot your password?
//                 </div>
//               </div>
//             </div>

//             <div>
//               <CustomButton type="submit">LOG IN</CustomButton>
//             </div>
//           </form>
//         </div>

//         <div className="h-10 flex gap-x-4 mb-4">
//           <p>Don't have an account?</p>
//           <p>
//             Register
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Login