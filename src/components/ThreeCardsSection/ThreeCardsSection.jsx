import { Card } from "../Card/Card";
import { GridContainer } from "../GridContainer/GridContainer";

export const ThreeCardsSection = ({ name, array, action }) => {
  return (
    <section>
      <h3>{name}</h3>
      <GridContainer columns={3}>
        {array?.map((item) => (
          <Card
            key={item.id}
            action={() => action(item.id)}
            image={`../overlook_api/images/${item.image.filename}`}
            title={item.title}
            description={item.teaser}
          ></Card>
        ))}
      </GridContainer>
    </section>
  );
};
