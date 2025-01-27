import { useState } from "react";
import { Form } from "../components/Form/Form"
import { loginForm } from "../static/Login"

export const Login = () => {

    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();
    const [errorLoginMessage, setErrorLoginMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState();
    const [successLoginMessage, setSuccessLoginMessage] = useState();

    function SubmitData(data) {
        const body = new URLSearchParams();
        body.append("username", data.email);
        body.append("password", data.password);
    
        async function fetchData() {
          setIsLoading(true);
    
          const options = {
            method: "POST",
            body: body,
          };
    
          try {
            const data = await fetch("http://localhost:4000/login", options);
            const res = await data.json();
            {
              if (res.access_token) {
                setIsLoggedIn(true);
                setUserData(res);
                setSuccessLoginMessage(
                  `Du er nu logget ind, velkommen tilbage ${res.user.firstname}`
                );
              } else {
                setErrorLoginMessage("Forkert email eller adgangskode");
              }
            }
          } catch (err) {
            setError(err);
          } finally {
            setIsLoading(false);
          }
        }
        fetchData();
      }

  return (
    <>
    <Form formArray={loginForm} callback={SubmitData} buttonText='Login'/>
    <h2>hej {errorLoginMessage}</h2>
    </>
  )
}