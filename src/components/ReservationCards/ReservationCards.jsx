import { useContext, useEffect, useState } from "react";
import { useGet } from "../../hooks/useGet";
import { UserContext } from "../../context/userContext";
import { roomArray, hotelArray } from "../../static/ReservationList";
import { toast } from "react-toastify";
import style from './ReservationCards.module.scss'

export const ReservationCards = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [reservations, setReservations] = useState([]);
  const { userToken } = useContext(UserContext);

  const { data } = useGet(
    "http://localhost:4000/reservations",
    userToken?.access_token
  );

  useEffect(() => {
    if (data) {
      const matchedData = data.map((reservation) => ({
        ...reservation,
        hotel: hotelArray.find((hotel) => hotel.id == reservation.hotel_id),
        room: roomArray.find((room) => room.id === reservation.room_id),
      }));
      setReservations(matchedData);
    }
  }, [data]);

  const deleteReservation = async (id) => {
    const body = new URLSearchParams();
    body.append("id", id);

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:4000/reservations", {
        method: "DELETE",
        body,
        headers: { Authorization: `Bearer ${userToken?.access_token}` },
      });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      setReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation.id !== id)
      );

      toast.success("Din reservation er blevet fjernet!");
    } catch (error) {
      toast.error(error.message || "Noget gik galt. Prøv igen senere");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(date).toLocaleDateString("da-DK", options);
  };

  return (
    <div className={style.reservationCard}>
      <span>
        <h6>Hotel- og værelsetype</h6>
        <h6>Dato</h6>
        <h6>Handling</h6>
      </span>
      <ul>
        {reservations.length > 0 ? (
          reservations.map((reservation) => (
            <li key={reservation.id}>
              <p>
                {reservation.hotel?.title} - {reservation.room?.title}
              </p>
              <p>
                {formatDate(reservation.checkin)} - {formatDate(reservation.checkout)}
              </p>
              <p>
                <button>Rediger</button>{" "}
                <button onClick={() => deleteReservation(reservation.id)}>
                  Slet
                </button>
              </p>
            </li>
          ))
        ) : (
          <li>Loading...</li>
        )}
      </ul>
    </div>
  );
};
