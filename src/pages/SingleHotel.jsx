import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb } from "../components/Breadcrumb/Breadcrumb";
import { Slideshow } from "../components/Slideshow/Slideshow";
import { DestinationNav } from "../components/DestinationNav/DestinationNav";
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper";
import { useGet } from "../hooks/useGet";
import { DestinationSideBar } from "../components/DestinationSideBar/DestinationSideBar";
import { GridContainer } from "../components/GridContainer/GridContainer";
import { RoomAccordion } from "../components/RoomAccordion/RoomAccordion";
import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { Reviews } from "../components/Reviews/Reviews";

export const SingleHotel = () => {
  const { slug, cityslug, hotelslug } = useParams();
  const [room, setRoom] = useState();
  const navigate = useNavigate();

  const { data } = useGet(
    `http://localhost:4000/destinations/${slug}/${cityslug}/${hotelslug}`
  );

  const { data: roomData } = useGet(
    `http://localhost:4000/destinations/${slug}/${cityslug}/${hotelslug}/${room}`
  );

  function handleButtonClick() {
    navigate(`/hotels/${slug}/${cityslug}/${hotelslug}/review`);
  }

  return (
    <>
      <Slideshow
        images={["slideshow6.jpg", "slideshow4.jpg", "slideshow5.jpg"]}
        title="HOTELLER & DESTINATIONER"
      />
      <DestinationNav />
      <SectionWrapper customStyling="destinations">
        <Breadcrumb />
        <GridContainer columns={21}>
          <section>
            <span>
              <h3>{data?.cities[0].hotels[0].title}</h3>
              <p>{data?.cities[0].hotels[0].description}</p>
              <h4>Vores værelser</h4>
            </span>
            <GridContainer columns={1} gap="four">
              {data?.cities[0].hotels[0].rooms.map((item) => (
                <RoomAccordion
                  key={item.slug}
                  imgSrc={`/images/${item.images[0].filename}`}
                  alttext={item.images[0].title}
                  title={item.title}
                  area={`${item.area}. Plads til ${item.num_persons} personer.`}
                  description={item.description}
                  price={`Fra ${item.day_price_normal},00 DKK`}
                  normalprice={item.day_price_normal}
                  flexprice={item.day_price_flex}
                  onClick={() => setRoom(item.slug)}
                  images={item.images}
                >
                  {room === item.slug && roomData && (
                    <>
                      <ul>
                        {roomData?.cities[0].hotels[0].rooms[0].room_facilities.map(
                          (facility) => (
                            <li key={facility.id}>● {facility.title}</li>
                          )
                        )}
                      </ul>
                    </>
                  )}
                </RoomAccordion>
              ))}
            </GridContainer>
          </section>
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
                {data?.cities[0]?.hotels[0]?.hotel_facilities.map((item) => (
                  <li key={item.title}>{item.title}</li>
                ))}
              </ul>
            </article>
            <Reviews
              id={data?.cities[0]?.hotels[0]?.hotel_id}
              action={handleButtonClick}
              button
            />
          </DestinationSideBar>
        </GridContainer>
      </SectionWrapper>
    </>
  );
};
