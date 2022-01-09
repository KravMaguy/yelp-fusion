import axios from "axios";
const Login = () => {
  const runit = () => {
    axios("/auth/google", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Cache: "no-cache",
      },
      mode: "no-cors",
    });
  };

  return (
    <>
      log in <button onClick={() => runit()}>Log In</button>
    </>
  );
};

export default Login;
