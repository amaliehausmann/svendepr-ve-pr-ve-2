import { useContext, useState } from "react";
import { Form } from "../components/Form/Form";
import { loginForm } from "../static/Login";
import { toast } from "react-toastify";
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper";
import { Breadcrumb } from "../components/Breadcrumb/Breadcrumb";
import { UserContext } from "../context/userContext";
import { Button } from "../components/Button/Button";

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorLoginMessage, setErrorLoginMessage] = useState("");

  const { setUserData, userData } = useContext(UserContext);

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
    setUserData(null); // Clear user data from context
    toast.info("Du er nu logget ud"); // Notify the user

    // Optional: Clear sessionStorage manually in case it's not working as expected
    sessionStorage.removeItem("userData");
  };

  return (
    <SectionWrapper customStyling="login">
      <Breadcrumb />
      <section>
        {userData ? (
          <>
            <article>
              <h4>
                Du er nu logget ind, velkommen tilbage{" "}
                {userData.user?.firstname || "Bruger"}!
              </h4>
            </article>
            <article>
              <h3>Brugeroplysninger</h3>
              <h6>
                <b>Navn:</b>{" "}
                {userData?.user.firstname + " " + userData.user.lastname}
              </h6>
              <Button action={LogOut} color="red" title="Log ud" />
            </article>
          </>
        ) : (
          <article>
            <h3>Login</h3>
            <h6>Indtast dit brugernavn og adgangskode for at logge ind</h6>
            <Form
              formArray={loginForm}
              callback={SubmitData}
              buttonText={isLoading ? "Logger ind..." : "Login"}
            />
            {errorLoginMessage && (
              <h4 style={{ color: "orange" }}>{errorLoginMessage}</h4>
            )}
          </article>
        )}
      </section>
    </SectionWrapper>
  );
};
