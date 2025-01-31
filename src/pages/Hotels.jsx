import { useNavigate, useParams } from "react-router-dom";
import { useGet } from "../hooks/useGet";
import { Breadcrumb } from "../components/Breadcrumb/Breadcrumb";
import { GridContainer } from "../components/GridContainer/GridContainer";
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper";
import { Card } from "../components/Card/Card";
import { DestinationNav } from "../components/DestinationNav/DestinationNav";
import { Slideshow } from "../components/Slideshow/Slideshow";
import { DestinationSideBar } from "../components/DestinationSideBar/DestinationSideBar";
import { Link } from "react-router-dom";

export const Hotels = () => {
  const { cityslug, slug } = useParams();

  const { data } = useGet(
    `http://localhost:4000/destinations/${slug}/${cityslug}`
  );

  const { data: otherCities } = useGet(
    `http://localhost:4000/destinations/${slug}`
  );
  const slideshowArray = ["slideshow6.jpg", "slideshow4.jpg", "slideshow5.jpg"];

  const navigate = useNavigate();

  function handleCardClick(countrySlug, cityslug, hotelslug) {
    navigate(`/hotels/${countrySlug}/${cityslug}/${hotelslug}`);
  }

  const filteredCities = otherCities?.cities.filter(
    (item) => item.slug !== cityslug
  );

  return (
    <>
      <Slideshow images={slideshowArray} title="HOTELLER & DESTINATIONER" />
      <DestinationNav />
      <SectionWrapper customStyling="destinations">
        <Breadcrumb />
        <GridContainer columns={21}>
          <section>
            <span>
              <h3>Vores hoteller i {data?.cities[0].name}</h3>
              <h6>{data?.cities[0].description}</h6>
            </span>
            <GridContainer columns={2} gap="four">
              {data?.cities.map((item) =>
                item.hotels.map((hotel) => (
                  <Card
                    action={() =>
                      handleCardClick(data?.slug, item.slug, hotel.slug)
                    }
                    key={hotel.hotel_id}
                    image={`/images/${hotel.HotelImage.hotel_image_filename}`}
                    alttext={hotel.HotelImage.hotel_image_title}
                    title={hotel.title}
                    custom="threeCards"
                    custom2="threeCards3"
                  ></Card>
                ))
              )}
            </GridContainer>
          </section>
          <DestinationSideBar>
            <h4>Besøg andre byer i {data?.name}</h4>
            <ul>
              {filteredCities?.map((item) => (
                <li key={item.city_id}>
                  <Link to={`/hotels/${data?.slug}/${item.slug}`}>
                    {`> ${item.name}`}
                  </Link>
                </li>
              ))}
            </ul>
          </DestinationSideBar>
        </GridContainer>
      </SectionWrapper>
    </>
  );
};
