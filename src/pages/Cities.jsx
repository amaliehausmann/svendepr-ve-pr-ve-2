import { useNavigate, useParams } from "react-router-dom";
import { useGet } from "../hooks/useGet";
import { Breadcrumb } from "../components/Breadcrumb/Breadcrumb";
import { GridContainer } from "../components/GridContainer/GridContainer";
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper";
import { Card } from "../components/Card/Card";
import { DestinationNav } from "../components/DestinationNav/DestinationNav";
import { Slideshow } from "../components/Slideshow/Slideshow";
import { DestinationSideBar } from "../components/DestinationSideBar/DestinationSideBar";

export const Cities = () => {
  const { slug } = useParams();

  const { data } = useGet(`http://localhost:4000/destinations/${slug}`);
  const slideshowArray = ["slideshow6.jpg", "slideshow4.jpg", "slideshow5.jpg"];

  const navigate = useNavigate();

  function handleCardClick(cityslug) {
    navigate(`/hotels/${slug}/${cityslug}`);
  }

  return (
    <>
      <Slideshow images={slideshowArray} title="HOTELLER & DESTINATIONER" />
      <DestinationNav />
      <SectionWrapper customStyling="destinations">
        <Breadcrumb />
        <GridContainer columns={21}>
          <section>
            <span>
              <h3>Vores hoteller i {data?.name}</h3>
              <h6>{data?.description}</h6>
            </span>
            <GridContainer columns={2} gap="four">
              {data?.cities.map((item) => (
                <Card
                  action={() => handleCardClick(item.slug)}
                  key={item.city_id}
                  image={`/public/images/${item.CityImage.city_image_filename}`}
                  alttext={item.CityImage.city_image_title}
                  title={item.name}
                  custom="threeCards"
                  custom2="threeCards3"
                ></Card>
              ))}
            </GridContainer>
          </section>
          <DestinationSideBar></DestinationSideBar>
        </GridContainer>
      </SectionWrapper>
    </>
  );
};
