import { Breadcrumb } from "../components/Breadcrumb/Breadcrumb";
import { Card } from "../components/Card/Card";
import { GridContainer } from "../components/GridContainer/GridContainer";
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper";
import { useGet } from "../hooks/useGet";
import { Slideshow } from "../components/Slideshow/Slideshow";
import { useNavigate } from "react-router-dom";

export const Countries = () => {
  const { data } = useGet("http://localhost:4000/destinations");
  const slideshowArray = ["slideshow6.jpg", "slideshow4.jpg", "slideshow5.jpg"];

  const navigate = useNavigate();

  function handleCardClick(slug) {
    navigate(`/hotels/${slug}`);
  }
  return (
    <>
      <Slideshow images={slideshowArray} title="HOTELLER & DESTINATIONER" />
      <SectionWrapper customStyling="destinations">
        <Breadcrumb />
        <span>
          <h3>Vores destinationer</h3>
          <h6>
            Er du klar til at udforske de smukkeste destinationer i Norden og
            Centraleuropa? Vi tilbyder et udvalg af nøje udvalgte hoteller i
            Danmark, Sverige, Norge, Finland, Tyskland, Polen og Island. Uanset
            om du ønsker at opleve den storslåede natur, historiske steder eller
            den moderne storby, så har vi noget for enhver smag.
          </h6>
        </span>
        <GridContainer columns={3} gap="four">
          {data?.map((item) => (
            <Card
              key={item.id}
              action={() => handleCardClick(item.slug)}
              image={`/public/images/${item.CountryImage.country_image_filename}`}
              alttext={item.CountryImage.country_image_title}
              title={item.name}
              description={item.description}
              custom="threeCards"
              custom2="threeCards2"
            ></Card>
          ))}
        </GridContainer>
      </SectionWrapper>
    </>
  );
};
