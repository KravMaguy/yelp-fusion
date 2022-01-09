import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
const Login = () => {
  const responseGoogle = async (response) => {
    console.log(response);
    if (response.profileObj) {
      console.log("it has profileObj prop");
      const { profileObj } = response;
      try {
        const data = await axios.post("/createlogin/", profileObj);
        console.log("the data", data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  console.log("process: ", process.env);
  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText='Login'
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        clientSecret={process.env.REACT_APP_CLIENT_SECRET}
      />
    </>
  );
};

export default Login;
