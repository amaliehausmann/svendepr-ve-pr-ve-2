import { useNavigate } from "react-router-dom";
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper";
import { Slideshow } from "../components/Slideshow/Slideshow";
import { useGet } from "../hooks/useGet";
import { GridContainer } from "../components/GridContainer/GridContainer";
import { Card } from "../components/Card/Card";

export const Frontpage = () => {
  const slideshowArray = ["slideshow.jpg", "slideshow1.jpg", "slideshow2.jpg"];
  const navigate = useNavigate();

  function handleNewsClick(id) {
    navigate(`/news/${id}`);
  }

  const { data: newsData } = useGet("http://localhost:4000/news");

  const { data: roomData } = useGet(
    "http://localhost:4000/destinations/danmark/aalborg/overlook-aalborg-city"
  );

  const slicedNews = newsData?.slice(0, 3);

  const randomThreeRooms = roomData?.cities[0].hotels[0].rooms
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  return (
    <>
      <Slideshow
        images={slideshowArray}
        title="VELKOMMEN TIL HOTEL OVERLOOK ONLINE"
      />
      <SectionWrapper>
        <GridContainer columns={1} gap="two">
          <h3>Sidste nyt</h3>
          <GridContainer columns={3} gap="six">
            {slicedNews?.map((item) => (
              <Card
                custom="threeCards"
                key={item.id}
                action={() => handleNewsClick(item.id)}
                image={`/public/images/${item.image.filename}`}
                title={item.title}
                description={item.teaser}
              />
            ))}
          </GridContainer>
          <h3>Se vores udvalg af værelser</h3>
          <GridContainer columns={3} gap="six">
            {randomThreeRooms?.map((item) => (
              <Card
                custom="threeCards"
                key={item.room_id}
                image={`/public/images/${item.images[0].filename}`}
                title={item.title}
                description={item.description}
              />
            ))}
          </GridContainer>
        </GridContainer>
      </SectionWrapper>
    </>
  );
};
