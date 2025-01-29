import { Card } from "../Card/Card";
import { GridContainer } from "../GridContainer/GridContainer";
import style from "./ThreeCardSection.module.scss";

export const ThreeCardsSection = ({ name, array, action }) => {
  return (
    <section className={style.threeCardSection}>
      <h3>{name}</h3>
      <GridContainer columns={3} gap="six">
        {array?.map((item) => (
          <Card
            custom="threeCards"
            key={item.id}
            action={() => action(item.id)}
            image={`/public/images/${item.image.filename}`}
            title={item.title}
            description={item.teaser}
          ></Card>
        ))}
      </GridContainer>
    </section>
  );
};
