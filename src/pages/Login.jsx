import { useContext, useState } from "react";
import { Form } from "../components/Form/Form";
import { loginForm } from "../static/Login";
import { toast } from "react-toastify";
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper";
import { Breadcrumb } from "../components/Breadcrumb/Breadcrumb";
import { UserContext } from "../context/userContext";
import { Button } from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { GridContainer } from "../components/GridContainer/GridContainer";
import { DestinationSideBar } from "../components/DestinationSideBar/DestinationSideBar";
import { ReservationCards } from "../components/ReservationCards/ReservationCards";

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorLoginMessage, setErrorLoginMessage] = useState("");

  const { setUserData, setUserToken, userToken, userData } = useContext(UserContext);

  const navigate = useNavigate();

  function handleSignUp() {
    navigate(`/signup`);
  }

  const SubmitData = (data) => {
    const body = new URLSearchParams();
    body.append("username", data.email);
    body.append("password", data.password);

    const fetchData = async () => {
      setIsLoading(true);

      const options = {
        method: "POST",
        body: body,
      };

      try {
        const response = await fetch("http://localhost:4000/login", options);

        if (!response.ok) {
          throw new Error("Forkert email eller adgangskode");
        }

        const res = await response.json();

        if (res.access_token) {
          setUserData(res);
          setUserToken(res);
          setErrorLoginMessage("");
          toast.success(
            `Du er nu logget ind, velkommen tilbage ${
              res.user?.firstname || ""
            }`
          );
        } else {
          throw new Error("Forkert email eller adgangskode");
        }
      } catch (err) {
        setErrorLoginMessage(
          err.message || "Der skete en fejl. Prøv igen senere."
        );
        toast.error(err.message || "Der skete en fejl. Prøv igen senere.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  };

  const LogOut = () => {
    setUserData(null);
    setUserToken(null);
    toast.info("Du er nu logget ud");
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("userToken");
  };

  return (
    <SectionWrapper customStyling="destinations">
      <Breadcrumb />
      <section>
        {userData ? (
          <>
            <GridContainer columns={21}>
              <section>
                <h4>Administrer reservationer</h4>
                <p>Her kan du ændre og afbestille dine reservationer.</p>
                <ReservationCards/>
              </section>
              <DestinationSideBar>
                <span>
                <h3>Dine oplysninger</h3>
                <h6>
                  Du er logget ind som <b>{userData?.user.firstname} {userData?.user.lastname}</b>
                </h6>
                <Button action={LogOut} color="red" title="Log ud" />
                </span>
              </DestinationSideBar>
            </GridContainer>
          </>
        ) : (
          <GridContainer columns={21}>
            <section>
              <h3>Login</h3>
              <h6>Indtast dit brugernavn og adgangskode for at logge ind</h6>
              <Form
                formArray={loginForm}
                callback={SubmitData}
                buttonText={isLoading ? "Logger ind..." : "Login"}
              >
                <Button
                  action={handleSignUp}
                  color="red"
                  title="Tilmeld dig"
                ></Button>
              </Form>
              {errorLoginMessage && (
                <h4 style={{ color: "orange" }}>{errorLoginMessage}</h4>
              )}
            </section>
            <DestinationSideBar></DestinationSideBar>
          </GridContainer>
        )}
      </section>
    </SectionWrapper>
  );
};
