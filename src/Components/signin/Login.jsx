import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebase"
import styled from "styled-components";
import backgroundimage from "../../images/loginOne.jpg";
import '../../index.css';
import CustomButton from "../reusables/CustomButton";

 const Login = () => {
  const [logInData, setLogInData] = useState({
    regNum: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogInData({ ...logInData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth,logInData.regNum,logInData.password)
    .then((userCredendtial) => {
      console.log(userCredendtial)
      
     
    }).catch((err) => {console.log(err)})

    console.log(logInData);
    setLogInData({ regNum: "", password: "" });
  };

  const SideDiv = styled.div`
  min-height: 100vh;
  width: 50%;
  background-image: url(${backgroundimage});
  background-size: cover;
  `;

  return (
    <div className="flex items-center w-100">
      <SideDiv className="sideDiv"></SideDiv>
      <div className="mainDiv flex flex-col items-center h-screen">
        <div className="h-20 text-4xl mt-4 mb-8">Sign In to your account</div>
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center flex-col gap-y-8">
              {/* first input  */}
              <div className="flex gap-x-4">
                <input
                  className="secondary-bg-color pl-4 text-left rounded-lg mb-2 w-96 h-12"
                  value={logInData.regNum}
                  type="text"
                  placeholder="Registration Number"
                  id="regNum"
                  name="regNum"
                  onChange={handleChange}
                />
              </div>
              {/* second input  */}
              <div className="flex gap-x-4">
                <input
                  className="secondary-bg-color pl-4 text-left rounded-lg w-96 h-12"
                  value={logInData.password}
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                />
              </div>

              <div className="flex gap-x-4 mb-4">
                <div className="flex items-center gap-x-2">
                  {/* <FaSquare className="" /> */}
                  <input type="checkbox" id="CheckBox" className="" />
                  Remember Me
                </div>
                <div>
                  Forgot your password?
                </div>
              </div>
            </div>

            <div>
              <CustomButton type="submit">LOG IN</CustomButton>
            </div>
          </form>
        </div>

        <div className="h-10 flex gap-x-4 mb-4">
          <p>Don't have an account?</p>
          <p>
            Register
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login