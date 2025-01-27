import { useParams } from "react-router-dom";

export const SingleNews = () => {
  const { id } = useParams();

  return <div>{id}</div>;
};
