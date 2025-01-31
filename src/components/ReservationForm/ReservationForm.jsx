import { useForm } from "react-hook-form";
import { InputField } from "../InputField/InputField";
import { useGet } from "../../hooks/useGet";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import style from "./ReservationForm.module.scss";

export const ReservationForm = ({
  formArray,
  formArray2,
  formArray3,
  formArray4,
  formArray5,
  buttonText,
  children,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [selectedHotel, setSelectedHotel] = useState();
  const [selectedRoom, setSelectedRoom] = useState();
  const [selectedNumber, setSelectedNumber] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const { userData, userToken } = useContext(UserContext);

  const { data: countryData } = useGet("http://localhost:4000/destinations");

  const { data: cityData, isLoading: cityLoading } = useGet(
    `http://localhost:4000/destinations/${selectedCountry}`
  );

  const { data: hotelData, isLoading: hotelLoading } = useGet(
    `http://localhost:4000/destinations/${selectedCountry}/${selectedCity}`
  );

  const { data: roomData, isLoading: roomLoading } = useGet(
    `http://localhost:4000/destinations/${selectedCountry}/${selectedCity}/${selectedHotel}`
  );

  const { data: roomDetails, isLoading: roomDetailsLoading } = useGet(
    `http://localhost:4000/destinations/${selectedCountry}/${selectedCity}/${selectedHotel}/${selectedRoom}`
  );

  const navigate = useNavigate();

  function handleSiteChange() {
    navigate("/login");
  }

  function handleCountryChange(e) {
    setSelectedCountry(e.target.value);
    setSelectedCity("");
    setSelectedHotel("");
    setSelectedRoom("");
    setSelectedNumber("");
  }

  function handleCityChange(e) {
    setSelectedCity(e.target.value);
    setSelectedHotel("");
    setSelectedRoom("");
    setSelectedNumber("");
  }

  function handleHotelChange(e) {
    setSelectedHotel(e.target.value);
    setSelectedRoom("");
    setSelectedNumber("");
  }

  function handleRoomChange(e) {
    setSelectedRoom(e.target.value);
    setSelectedNumber("");
  }

  const submitReservation = async (data) => {
    if (!isTermsAccepted) {
      toast.error(
        "Du skal acceptere Overlooks betingelser før du kan fortsætte."
      );
      return;
    }

    const body = new URLSearchParams();
    const hotel = roomDetails?.cities?.[0]?.hotels?.[0];
    const room = hotel?.rooms?.[0];

    body.append("user_id", userData?.user?.id || "");
    body.append("hotel_id", hotel?.hotel_id || "");
    body.append("room_id", room?.room_id || "");
    body.append("is_flex", data.price);
    body.append("num_persons", selectedNumber);
    body.append("checkin", data.checkin);
    body.append("checkout", data.checkout);
    body.append("firstname", data.firstname);
    body.append("lastname", data.lastname);
    body.append("email", data.email);
    body.append("phone", data.phone);
    body.append("comment", data.comment);

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:4000/reservations", {
        method: "POST",
        body,
        headers: { Authorization: `Bearer ${userToken?.access_token}` },
      });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      toast.success("Din reservation er blevet tilføjet!");
      handleSiteChange();
    } catch (error) {
      toast.error(error.message || "Noget gik galt. Prøv igen senere");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className={style.reservationForm}
      onSubmit={handleSubmit((formdata) =>
        submitReservation(formdata, userToken?.access_token)
      )}
    >
      <span>
        <div>
          <select
            id="country"
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            <option value="">Vælg land</option>
            {countryData?.map((item) => (
              <option key={item.id} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
          {errors.country && (
            <h6 style={{ color: "orange" }}>{errors.country.message}</h6>
          )}
        </div>

        <div>
          <select
            id="city"
            value={selectedCity}
            onChange={handleCityChange}
            disabled={cityLoading || !selectedCountry}
          >
            <option value="">Vælg by</option>
            {cityLoading ? (
              <option value="">Loading...</option>
            ) : (
              cityData?.cities?.map((item) => (
                <option key={item.city_id} value={item.slug}>
                  {item.name}
                </option>
              ))
            )}
          </select>
          {errors.city && (
            <h6 style={{ color: "orange" }}>{errors.city.message}</h6>
          )}
        </div>
      </span>
      <span>
        <div>
          <select
            id="hotel"
            value={selectedHotel}
            onChange={handleHotelChange}
            disabled={hotelLoading || !selectedCity}
          >
            <option value="">Vælg hotel</option>
            {hotelLoading ? (
              <option value="">Loading...</option>
            ) : (
              hotelData?.cities[0]?.hotels.map((item) => (
                <option key={item.hotel_id} value={item.slug}>
                  {item.title}
                </option>
              ))
            )}
          </select>
          {errors.hotel && (
            <h6 style={{ color: "orange" }}>{errors.hotel.message}</h6>
          )}
        </div>

        <div>
          <select
            id="room"
            value={selectedRoom}
            onChange={handleRoomChange}
            disabled={roomLoading || !selectedHotel}
          >
            <option value="">Vælg værelse</option>
            {roomLoading ? (
              <option value="">Loading...</option>
            ) : (
              roomData?.cities[0]?.hotels[0]?.rooms.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.title}
                </option>
              ))
            )}
          </select>
          {errors.room && (
            <h6 style={{ color: "orange" }}>{errors.room.message}</h6>
          )}
        </div>
        <div>
          <select
            id="numpeople"
            value={selectedNumber || ""}
            onChange={(e) => setSelectedNumber(e.target.value)}
            disabled={!selectedRoom || roomDetailsLoading}
          >
            <option value="">Vælg antal personer</option>
            {!roomDetailsLoading &&
            roomDetails?.cities[0].hotels[0].rooms[0].num_persons ? (
              Array.from(
                {
                  length: roomDetails?.cities[0].hotels[0].rooms[0].num_persons,
                },
                (_, i) => i + 1
              ).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))
            ) : (
              <option value="">Ingen tilgængelige valg</option>
            )}
          </select>
          {errors.numpeople && (
            <p style={{ color: "orange" }}>{errors.numpeople.message}</p>
          )}
        </div>
      </span>

      {formArray.map((item) => (
        <InputField
          key={item.name}
          name={item.name}
          label={item.label}
          type={item.type}
          placeholder={item.placeholder}
          register={register}
          validation={item.validation}
          error={errors[item.name]}
          options={item.options}
        />
      ))}
      <div className={style.flex}>
        {formArray2.map((item) => (
          <InputField
            key={item.name}
            name={item.name}
            label={item.label}
            type={item.type}
            placeholder={item.placeholder}
            register={register}
            validation={item.validation}
            error={errors[item.name]}
            options={item.options}
          />
        ))}
      </div>
      {formArray3.map((item) => (
        <InputField
          key={item.name}
          name={item.name}
          label={item.label}
          type={item.type}
          placeholder={item.placeholder}
          register={register}
          validation={item.validation}
          error={errors[item.name]}
          options={item.options}
        />
      ))}

      <div className={style.flex}>
        {formArray4.map((item) => (
          <InputField
            key={item.name}
            name={item.name}
            label={item.label}
            type={item.type}
            placeholder={item.placeholder}
            register={register}
            validation={item.validation}
            error={errors[item.name]}
            options={item.options}
          />
        ))}
      </div>
      {formArray5.map((item) => (
        <InputField
          key={item.name}
          name={item.name}
          label={item.label}
          type={item.type}
          placeholder={item.placeholder}
          register={register}
          validation={item.validation}
          error={errors[item.name]}
          options={item.options}
        />
      ))}
      <label className={style.checkbox}>
        <input
          type="checkbox"
          checked={isTermsAccepted}
          onChange={() => setIsTermsAccepted(!isTermsAccepted)}
        />
        Jeg accepterer hermed Overlooks betingelser (sæt kryds)
      </label>

      <div>
        <input className={style.button} type="submit" value={buttonText} />
        {children}
      </div>
    </form>
  );
};
