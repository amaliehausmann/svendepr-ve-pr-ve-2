import { useContext } from "react";
import { useGet } from "../../hooks/useGet";
import { UserContext } from "../../context/userContext";
import { FaRegStar, FaStar } from "react-icons/fa";
import style from "./Reviews.module.scss";
import { Button } from "../Button/Button";

export const Reviews = ({ id, action, button }) => {
  const { userToken } = useContext(UserContext);

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

  const randomThreeComments =
    !data.access_token && data?.sort(() => Math.random() - 0.5).slice(0, 3);

  return (
    <>
      {userToken ? (
        <div className={style.ReviewStyling}>
          <h3>Vores kunders mening</h3>
          <article>
            {!data.access_token &&
              randomThreeComments?.map((item) => {
                const stars = [];
                for (let i = 0; i < 5; i++) {
                  stars.push(
                    i < item.num_stars ? (
                      <FaStar key={i} />
                    ) : (
                      <FaRegStar key={i} />
                    )
                  );
                }

                return (
                  <div key={item.id}>
                    <h6>
                      Af {item.user.firstname} {item.user.lastname},{" "}
                      {formatDate(item.created_at)}
                    </h6>
                    <div>{stars}</div>
                    <p>{item.comment}</p>
                  </div>
                );
              })}
          </article>
          {button && (
            <Button
              action={action}
              color="red"
              title="Skriv anmeldelse"
            ></Button>
          )}
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
