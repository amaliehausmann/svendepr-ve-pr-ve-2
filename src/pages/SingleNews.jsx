import { Link, useParams } from "react-router-dom";
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper";
import { useGet } from "../hooks/useGet";
import { IoChevronBack } from "react-icons/io5";

export const SingleNews = () => {
  const { id } = useParams();

  const { data } = useGet(`http://localhost:4000/news/${id}`);

  function convertUnix(datetime) {
    const date = new Date(datetime * 1000);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleString("da-DK", options);
  }

  return (
    <SectionWrapper customStyling="singleNews">
      <span>
        <h2>{data?.title}</h2>
        <Link to="/">
          {" "}
          <IoChevronBack />
          Tilbage til forsiden
        </Link>
      </span>
      <h6>{convertUnix(data?.datetime)}</h6>
      <img src={`../src/assets/images/images/${data?.image.filename}`} alt="" />
      <h6>{data?.content}</h6>
    </SectionWrapper>
  );
};
