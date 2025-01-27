import { useNavigate } from "react-router-dom";
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper";
import { Slideshow } from "../components/Slideshow/Slideshow";
import { ThreeCardsSection } from "../components/ThreeCardsSection/ThreeCardsSection";
import { useGet } from "../hooks/useGet";

export const Frontpage = () => {
  const slideshowArray = ["slideshow.jpg", "slideshow1.jpg", "slideshow2.jpg"];
  const navigate = useNavigate();

  function handleNewsClick(id) {
    navigate(`/news/${id}`);
  }

  const roomArray = [
    {
      id: 1,
      title: "Standard Single",
      teaser:
        "Hvis du er på et kort besøg, er vores standard single værelser ideelle.",
      image: { filename: "room-standard-single-bed.jpg" },
    },
    {
      id: 2,
      title: "Superior Plus",
      teaser:
        "Giv din ferie et ekstra pift ved at bo i vores smukke superior plus-værelser. Nogle af værelserne har egen terrasse og udsigt til havet.",
      image: { filename: "room-superior-plus-bedroom.jpg" },
    },
    {
      id: 3,
      title: "Junior Plus",
      teaser:
        "Vågn op til den charmerende balkon udsigt og slap af med et karbad i vores moderne badeværelser.",
      image: { filename: "room-junior-suite-bedroom.jpg" },
    },
  ];

  const { data: newsData } = useGet("http://localhost:4000/news");

  const slicedNews = newsData?.slice(0, 3);

  return (
    <>
      <Slideshow
        images={slideshowArray}
        title="VELKOMMEN TIL HOTEL OVERLOOK ONLINE"
      />
      <SectionWrapper>
        <ThreeCardsSection
          name="Sidste nyt"
          array={slicedNews}
          action={(id) => handleNewsClick(id)}
        />
        <ThreeCardsSection
          name="Se vores udvalg af værelser"
          array={roomArray}
        />
      </SectionWrapper>
    </>
  );
};
