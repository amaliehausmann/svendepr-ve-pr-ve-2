import { Form } from "../components/Form/Form";
import { Breadcrumb } from "../components/Breadcrumb/Breadcrumb";
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper";
import { signupForm } from "../static/Signup";
import { GridContainer } from "../components/GridContainer/GridContainer";
import { DestinationSideBar } from "../components/DestinationSideBar/DestinationSideBar";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const { setUserData, userData } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const navigate = useNavigate();

  function handleNavigate() {
    navigate("/login");
  }

  //POST request
  const SubmitData = (data) => {
    const body = new URLSearchParams();
    body.append("firstname", data.firstname);
    body.append("lastname", data.lastname);
    body.append("email", data.email);
    body.append("password", data.password);
    body.append("is_active", true);
    body.append("org_id", "1");
    body.append("refresh_token", "1234");
    body.append("groups", "1");

    const fetchData = async () => {
      setIsLoading(true);

      const options = {
        method: "POST",
        body: body,
      };

      try {
        const response = await fetch("http://localhost:4000/users", options);

        const res = await response.json();
        console.log(res);
        if (res.message == "Record created") {
          toast.success(
            `Du er nu tilmeldt! Godt at have dig her ${data?.firstname}`
          );

          handleNavigate();
        }
      } catch (err) {
        setError(err);
        toast.error(err.message || "Der skete en fejl. Prøv igen senere.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  };

  return (
    <>
      <SectionWrapper customStyling="signup">
        <GridContainer columns={21}>
          <section>
            <Breadcrumb />
            <h3>Tilmeld som ny bruger</h3>
            <Form
              formArray={signupForm}
              callback={SubmitData}
              buttonText="Tilmeld dig"
            ></Form>
          </section>
          <DestinationSideBar />
        </GridContainer>
      </SectionWrapper>
    </>
  );
};
