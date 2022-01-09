import { GoogleLogin } from "react-google-login";
const Login = () => {
  const responseGoogle = (response) => {
    console.log(response);
  };
  console.log(process.env);
  return (
    <>
      <GoogleLogin
        clientId={process.env.client_id}
        buttonText='Login'
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        clientSecret={process.env.client_secret}
      />
    </>
  );
};

export default Login;
