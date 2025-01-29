import { useContext } from "react";
import { useGet } from "../../hooks/useGet";
import { UserContext } from "../../context/userContext";
import { FaRegStar, FaStar } from "react-icons/fa";
import style from './Reviews.module.scss'
import { Button } from "../Button/Button";
import { useNavigate } from "react-router-dom";

export const Reviews = ({ id}) => {
  const { userToken } = useContext(UserContext);
  const navigate = useNavigate()

  const { data = [] } = useGet(
    `http://localhost:4000/reviews/list_by_hotel/${id}`,
    userToken?.access_token
  );

  const formatDate = (datetime) => {
    return new Date(datetime).toLocaleDateString("da-DK", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  function handleButtonClick(){
    navigate('/review')
  }

  console.log(data);

  return (
    <>
      {userToken ? (
        <div className={style.ReviewStyling}>
          <h3>Vores kunders mening</h3>
          <article>
          {data?.map((item) => {
            const stars = [];
            for (let i = 0; i < 5; i++) {
              stars.push(
                i < item.num_stars ? <FaStar key={i} /> : <FaRegStar key={i} />
              );
            }

            return (
              <div key={item.id}>
                <h5>
                  af {item.user.firstname} {item.user.lastname},{" "}
                  {formatDate(item.created_at)}
                </h5>
                <div>{stars}</div>
                <p>{item.comment}</p>
              </div>
            );
          })}
          </article>
          <Button action={handleButtonClick} color='red' title='Skriv anmeldelse'></Button>


        </div>
      ) : (
        <div>
          <h3>Vores kunders mening</h3>
          <h6>
            Du skal være <b>Logget ind</b> for at se og skrive anmeldelser
          </h6>
        </div>
      )}
    </>
  );
};
