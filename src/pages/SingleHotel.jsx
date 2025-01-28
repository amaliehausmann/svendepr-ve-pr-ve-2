import { useParams } from "react-router-dom"
import { Breadcrumb } from "../components/Breadcrumb/Breadcrumb";

export const SingleHotel = () => {
    const {hotelslug} = useParams();

    console.log(hotelslug);

  return (
    <>
    <Breadcrumb/>
    </>
  )
}