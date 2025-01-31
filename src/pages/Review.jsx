import { useContext, useState } from "react";
import { Breadcrumb } from "../components/Breadcrumb/Breadcrumb";
import { DestinationSideBar } from "../components/DestinationSideBar/DestinationSideBar";
import { Form } from "../components/Form/Form";
import { GridContainer } from "../components/GridContainer/GridContainer";
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper";
import { reviewForm } from "../static/Review";
import { UserContext } from "../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGet } from "../hooks/useGet";
import { Reviews } from "../components/Reviews/Reviews";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";

export const Review = () => {
  const { userToken } = useContext(UserContext);

  const { slug, hotelslug, cityslug } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const { data: hotelData } = useGet(
    `http://localhost:4000/destinations/${slug}/${cityslug}/${hotelslug}`
  );


  const navigate = useNavigate();

  function navigateBack() {
    navigate(`/hotels/${slug}/${cityslug}/${hotelslug}`);
  }

  const submitComment = (data, token) => {
    const body = new URLSearchParams();
    body.append("hotel_id", hotelData?.cities[0].hotels[0].hotel_id);
    body.append("title", data.title);
    body.append("comment", data.comment);
    body.append("num_stars", data.stars);
    body.append("is_active", true);

    const fetchData = async () => {
      setIsLoading(true);

      const options = {
        method: "POST",
        body: body,
        headers: { Authorization: `Bearer ${token}` },
      };

      try {
        const response = await fetch("http://localhost:4000/reviews", options);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const res = await response.json();
        console.log("Response:", res);
        toast.success("Din kommentar er blevet tilføjet!");
        navigateBack();
      } catch (error) {
        toast.error("Noget gik galt. Prøv igen senere");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  };

  return (
    <>
      <SectionWrapper customStyling='destinations' customStyling2='review'>
        <GridContainer columns={21}>
          <section>
            <Breadcrumb />
            <h3>
              Skriv en anmeldelse af {hotelData?.cities[0].hotels[0].title}
            </h3>
            <h6>
              Udfyld nedenstående formular med din oplevelse af vores hotel.
            </h6>
            <Form
              formArray={reviewForm}
              buttonText="Send anmeldelse"
              callback={(formdata) =>
                submitComment(formdata, userToken?.access_token)
              }
            />
          </section>
          <section>
            <DestinationSideBar>
              <article>
                <h3>Information</h3>
                <p>
                  {" "}
                  <FaLocationDot />
                  Sigtun 38
                </p>
                <p>
                  {" "}
                  <FaPhoneAlt /> 1122334455
                </p>

                <h3>Faciliteter</h3>
                <ul>
                  {hotelData?.cities[0]?.hotels[0]?.hotel_facilities.map(
                    (item) => (
                      <li key={item.title}>{item.title}</li>
                    )
                  )}
                </ul>
              </article>
              <Reviews id={hotelData?.cities[0]?.hotels[0]?.hotel_id} />
            </DestinationSideBar>
          </section>
        </GridContainer>
      </SectionWrapper>
    </>
  );
};
